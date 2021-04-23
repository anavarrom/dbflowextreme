import { Notification } from './../../models/notification';
import { APIProvider } from './../../../data/api.provider';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ChatMessage } from 'src/app/core/models/message';
import { ChatType, IChatMessage } from './../../../data/interfaces/models';
import { IChat } from 'src/app/data/interfaces/models';
import { SessionQuery } from './../session/session.query';
import { ChatService } from 'src/app/data/api/chat.service';
import { ChatsQuery } from './chats.query';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ChatsStore } from './chats.store';
import { MessageService } from 'src/app/data/api/message.service';
import { Chat } from '../../models/chat';
import { StompService } from '@stomp/ng2-stompjs';
import { Subject, Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs'
import * as moment from 'moment';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({ providedIn: 'root' })
export class ChatsService {

  private topicSubscription: Subscription;
  ngDestroy$ = new Subject();

  constructor(private chatsStore: ChatsStore, private chatsQuery: ChatsQuery,
              private chatService: ChatService, private apiProvider: APIProvider,
              private sessionQuery: SessionQuery, private toastService: ToastService,
              private notificationsService: NotificationsService) {

                // Cargamos los mensajes y seleccionamos
  }

  loadChats() {
    // const projectId = this.projectsQuery.getActiveId() as number;
    this.chatService.findAllByUser().subscribe(
      // (notifs: INotification[]) => {
      (chats: HttpResponse<IChat[]>) => {
        let newChats: IChat[] = chats.body.map((chat: IChat) => {
          chat.withContact = (chat.owner === this.sessionQuery.Me) ? chat.to : chat.owner;
          return Object.assign({ messages: [] }, chat);
        });

        this.chatsStore.set(newChats);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  init(username: string) {
    this.apiProvider.messageProvider.init(username);

    this.apiProvider.messageProvider.newNotification().subscribe(
      (newMessage: IChatMessage) => {
        this.chatsStore.addMessages(newMessage.chatId, [newMessage]);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  createChatFromNotification(notification: Notification) {
    let chat: Chat = new Chat();
    chat.owner = notification.from;
    chat.to = notification.to;
    chat.subject = notification.subject;
    chat.createdDate = moment();
    chat.type = ChatType.NOTIFICATION;
    chat.withContact = (chat.owner === this.sessionQuery.Me) ? chat.to : chat.owner;

    this.chatService.create(chat).subscribe(
      // (notifs: INotification[]) => {
      (chatResponse: HttpResponse<IChat>) => {
        this.chatsStore.add(chatResponse.body);
        this.chatsStore.setActive(chatResponse.body.id);
        // Update notification
        this.notificationsService.updateChatNotification(notification.id, chatResponse.body);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    )
  }

  loadMessages(chatId: number) {
    // Cargamos los mensajes y seleccionamos
    this.apiProvider.messageProvider.findAllMessagesByChat(chatId)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        (messages: IChatMessage[]) => {
          this.chatsStore.fillMessages(chatId, messages);
          this.chatsStore.setActive(chatId);
        }, err => {
          // Log errors if any
          console.log(err);
        }
      );
  }

  newMessage(body: string) {
    let message: IChatMessage = new ChatMessage();
    message.chatId = this.chatsQuery.getActiveId();
    message.from = this.sessionQuery.Me;
    message.to = (this.chatsQuery.getActive() as Chat).withContact;
    message.body = body;

    // Cargamos los mensajes y seleccionamos
    this.apiProvider.messageProvider.newMessage(message).subscribe(
      (newMessage: IChatMessage) => {
        this.chatsStore.addMessages(newMessage.chatId, [newMessage]);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
}

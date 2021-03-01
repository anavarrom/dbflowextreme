import { ToastService } from 'src/app/shared/services/toast.service';
import { ChatMessage } from 'src/app/core/models/message';
import { IChatMessage } from './../../../data/interfaces/models';
import { IChat } from 'src/app/data/interfaces/models';
import { SessionQuery } from './../session/session.query';
import { ChatService } from 'src/app/data/api/chat.service';
import { ChatsQuery } from './chats.query';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map, tap } from 'rxjs/operators';
import { ChatsStore } from './chats.store';
import { MessageService } from 'src/app/data/api/message.service';
import { Chat } from '../../models/chat';
import { StompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs'

@Injectable({ providedIn: 'root' })
export class ChatsService {

  private topicSubscription: Subscription;

  constructor(private chatsStore: ChatsStore, private chatsQuery: ChatsQuery,
              private chatService: ChatService, private messageService: MessageService,
              private sessionQuery: SessionQuery, private  toastService:ToastService,
              private _stompService: StompService)
  {
    this.topicSubscription = this._stompService.watch('/chat').pipe(map(function (message) {
      return JSON.parse(message.body);
    })).subscribe(function (payload) {
      this.toastService.info("Yujuuuuu");
      // displayIncomingMessage(payload.user, payload.message);
    });
  }

  initChats()
  {
    // const projectId = this.projectsQuery.getActiveId() as number;
    this.chatService.findAllByUser().subscribe(
        // (notifs: INotification[]) => {
        (chats: HttpResponse<IChat[]>) => {

          let newChats:IChat[] = chats.body.map( (chat: IChat) => {
            chat.withContact = (chat.owner === this.sessionQuery.Me) ? chat.to : chat.owner;
            return Object.assign({messages:[]}, chat);
        });

          this.chatsStore.set(newChats);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }

  selectChat(chatId: number)
  {
    // Cargamos los mensajes y seleccionamos
        this.messageService.findAllByChat(chatId).subscribe(
        (messages: HttpResponse<IChatMessage[]>) => {
          this.chatsStore.addMessages(chatId, messages.body);
          this.chatsStore.setActive(chatId);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }

  newMessage(body:string)
  {
    let message:IChatMessage = new ChatMessage();
    message.chatId  = this.chatsQuery.getActiveId();
    message.from    = this.sessionQuery.Me;
    message.to      = (this.chatsQuery.getActive() as Chat).withContact;
    message.body    = body;

    // Cargamos los mensajes y seleccionamos
        this.messageService.create(message).subscribe(
        (newMessage: HttpResponse<IChatMessage>) => {
          this.chatsStore.addMessages(newMessage.body.chatId, [newMessage.body]);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }
}

import { APIProvider } from './../../../data/api.provider';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ChatMessage } from 'src/app/core/models/message';
import { IChatMessage } from './../../../data/interfaces/models';
import { IChat } from 'src/app/data/interfaces/models';
import { SessionQuery } from './../session/session.query';
import { ChatService } from 'src/app/data/api/chat.service';
import { ChatsQuery } from './chats.query';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { map, tap } from 'rxjs/operators';
import { ChatsStore } from './chats.store';
import { MessageService } from 'src/app/data/api/message.service';
import { Chat } from '../../models/chat';
import { StompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs'

@Injectable({ providedIn: 'root' })
export class ChatsService{

  private topicSubscription: Subscription;

  constructor(private chatsStore: ChatsStore, private chatsQuery: ChatsQuery,
              private chatService: ChatService, private apiProvider: APIProvider,
              private sessionQuery: SessionQuery, private  toastService: ToastService,
              private _stompService: StompService)
  {
/*      const topic = '/chat'; //' + this.sessionQuery.Me;
      this.topicSubscription = this._stompService.watch(topic).pipe(map(function (message) {
      //  this.topicSubscription = this._stompService.watch('/user/queue/specific-user').pipe(map(function (message) {
        return JSON.parse(message.body);
      })).subscribe(function (payload) {
        this.toastService.info("Yujuuuuu");
        // displayIncomingMessage(payload.user, payload.message);
      });
      */
    /* const topic = '/chat'; //' + this.sessionQuery.Me;
     this.topicSubscription = this._stompService.subscribe(topic).subscribe((message) => {
       const newMessage: IChatMessage = JSON.parse(message.body);

      this.toastService.info("Yujuuuuu");
    });*/
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
        this.apiProvider.messageProvider.findAllMessagesByChat(chatId).subscribe(
        (messages: IChatMessage[]) => {
          this.chatsStore.addMessages(chatId, messages);
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
    this.apiProvider.messageProvider.newMessage(message).subscribe(
        (newMessage: IChatMessage) => {
          this.chatsStore.addMessages(newMessage.chatId, [newMessage]);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }
}

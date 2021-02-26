import { IChat } from 'src/app/data/interfaces/models';
import { SessionQuery } from './../session/session.query';
import { ChatService } from 'src/app/data/api/chat.service';
import { ChatsQuery } from './chats.query';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ChatsStore } from './chats.store';

@Injectable({ providedIn: 'root' })
export class ChatsService {

  constructor(private chatsStore: ChatsStore, private chatsQuery: ChatsQuery,
              private chatService: ChatService, private sessionQuery: SessionQuery ){
  }

  loadChats()
  {
    // const projectId = this.projectsQuery.getActiveId() as number;
    this.chatService.findAllByUser(this.sessionQuery.Me).subscribe(
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
}

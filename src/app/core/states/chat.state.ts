import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { patch, updateItem, insertItem } from '@ngxs/store/operators';

import * as R from 'ramda';
import { Chat } from '../models/chat';
import { LoadChats, SelectChat, NewMessage } from '../actions/chat.action';
import { ChatService } from 'src/app/data/api/chat.service';
import { HttpResponse } from '@angular/common/http';
import { IChat, IChatMessage } from 'src/app/data/interfaces/models';
import { MessageService } from 'src/app/data/api/message.service';
import { ChatMessage } from '../models/message';
import { RxStompService, StompService, StompState } from '@stomp/ng2-stompjs';
import * as moment from 'moment';
import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';
import 'rxjs/add/operator/map';
//import 'rxjs/Rx';

// Create an interface for
export interface ChatState {
    chats: Chat[];
    pendingMessages: ChatMessage [];
    size: number;
    selectedId: number;
}

// Creamos nuestro estado con la anotación @State
// Le damos el tipo al estado.
// Le damos nombre al 'slice' o partición del estado.
// Damos valor por defecto al estado.
@State({
    name: 'chat',
    defaults: {
      chats: [],
      pendingMessages: [],
      size: 0,
      selectedId: 0
    }
})
export class ChatStore {

  public connectionStatus$: Observable<string>;

    constructor(/*private store: Store, private chatService: ChatService,
                private messageService: MessageService, 
                //private wsServ: wsService
                private _stompService: StompService*/) {
        // this.notificationOptions        = new PaginateOptions();
        // this.notificationOptions.limit  = 50;
        // this.notificationOptions.page   = 0;

      /*  this._stompService.state
        .map((state: number) => StompState[state])
        .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });*/
/*
    let stomp_subscription = this._stompService.subscribe('/chat/newMessageOK');

    stomp_subscription.map((message: ChatMessage) => {
      return message.body;
    }).subscribe((msgBody: string) => {
      console.log(`Received: ${msgBody}`);
    });*/

    }

    @Selector()
    // @ImmutableSelector()
    static all(state: ChatState): Chat[] {
      return state.chats;
    }

    @Selector()
    static selected(state: ChatState): Chat | null {
      return R.find((chat: Chat) => (chat.id  === state.selectedId), state.chats);
    }


    @Action(LoadChats)
    LoadChats(stateContext: StateContext<ChatState>) {
      /*
        this.chatService.query().subscribe(
            // (notifs: INotification[]) => {
            (chatsRead: HttpResponse<IChat[]>) => {
              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ chats: chatsRead.body , size: chatsRead.body.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );*/
    }

    @Action(SelectChat)
    SelectChat(stateContext: StateContext<ChatState>, action: SelectChat) {
      // Lo primero que tenemos que hacer es ver si tenemos mensajes
     /* let selectedChat: Chat = R.find((chat: Chat) => (chat.id  === action.id), stateContext.getState().chats);
      if (!selectedChat.hasOwnProperty('messages')) {
        // No tenemos mensajes.... cargamos
        this.messageService.queryAllMessagesFrom(selectedChat.id).subscribe(
          (chatsRead: HttpResponse<IChatMessage[]>) => {
            const updatedChat  = {...selectedChat, messages: chatsRead.body};
            stateContext.setState(
              patch({
                chats: updateItem<IChat>(chat => chat.id === action.id, updatedChat)
              })
            );
            // Actualizamos el estado con pathState({nombre_propiedad: valor}).
            stateContext.patchState({ selectedId: action.id});
          }, err => {
            // Log errors if any
            console.log(err);
          }
      );
      }*/
    }

  @Action(NewMessage)
  addMessage(stateContext: StateContext<ChatState>, action: NewMessage) {
    // Lo primero que tenemos que hacer es actualizar el estado
    let selectedChat: Chat = R.find((chat: Chat) => (chat.id  === stateContext.getState().selectedId), stateContext.getState().chats);
    let msgs: ChatMessage[] = selectedChat.messages;
    let msg: ChatMessage = action.message;

    msg.chatId = selectedChat.id;
    msg.emittedDate = moment();

    stateContext.setState(
      patch({
        msgs: insertItem<IChatMessage>(msg),
        pendingMessages: insertItem<IChatMessage>(msg)
      })
    );

    // Lanzamos por websocket el mensaje
    // const event = new SendWebSocketMessage({ type: 'message', msg });
    // this.store.dispatch(event);
    // this._stompService.publish('/chat/newMessage',  JSON.stringify(msg));
  }
}

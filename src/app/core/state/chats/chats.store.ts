import { IChatMessage } from './../../../data/interfaces/models';
import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Chat } from '../../models/chat';

export interface ChatsState extends EntityState<Chat> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chats' })
export class ChatsStore extends EntityStore<ChatsState> {

  constructor() {
    super();
  }

  fillMessages(chatId: number, newMessages: IChatMessage[] ) {
    this.update(chatId, ({ messages }) => ({
      messages: newMessages
    }));
  }

  addMessages(chatId: number, newMessages: IChatMessage[] ) {
    this.update(chatId, ({ messages }) => ({
      messages: arrayAdd(messages, newMessages)
    }));
  }

  updateMessage(chatId: number, newMessage: IChatMessage ) {
    this.update(chatId, ({ messages }) => ({
      messages: arrayUpdate(messages, newMessage.id, newMessage)
    }));
  }

  deleteMessage(chatId: number, newMessage: IChatMessage ) {
    this.update(chatId, ({ messages }) => ({
      messages: arrayRemove(messages, newMessage.id)
    }));
  }
}

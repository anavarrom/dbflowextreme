import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Chat } from '../../models/chat';

export interface ChatsState extends EntityState<Chat> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chats' })
export class ChatsStore extends EntityStore<ChatsState> {

  constructor() {
    super();
  }

}

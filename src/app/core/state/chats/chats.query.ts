import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ChatsStore, ChatsState } from './chats.store';

@Injectable({ providedIn: 'root' })
export class ChatsQuery extends QueryEntity<ChatsState> {

  constructor(protected store: ChatsStore) {
    super(store);
  }

}

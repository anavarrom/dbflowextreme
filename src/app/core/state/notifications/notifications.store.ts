import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Notification } from './notification.model';

export interface NotificationsState extends EntityState<Notification> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notifications' })
export class NotificationsStore extends EntityStore<NotificationsState> {

  constructor() {
    super();
  }

}

import { Injectable } from '@angular/core';
import { NotificationStatus } from '../../../data/interfaces/models';
import { QueryEntity } from '@datorama/akita';
import { NotificationsStore, NotificationsState } from './notifications.store';

@Injectable({ providedIn: 'root' })
export class NotificationsQuery extends QueryEntity<NotificationsState> {

  constructor(protected store: NotificationsStore) {
    super(store);
  }

  pendingNotifications$ = this.selectAll({
    filterBy: entity => entity.status === NotificationStatus.EMITTED
  });

  receivedNotifications$ = this.selectAll({
    filterBy: entity => entity.status === NotificationStatus.RECEIVED
  });

  readNotifications$ = this.selectAll({
    filterBy: entity => entity.status === NotificationStatus.READ
  });
}

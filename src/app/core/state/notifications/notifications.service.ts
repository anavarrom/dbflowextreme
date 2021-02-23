import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Notification } from './notification.model';
import { NotificationsStore } from './notifications.store';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  constructor(private notificationsStore: NotificationsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Notification[]>('https://api.com').pipe(tap(entities => {
      this.notificationsStore.set(entities);
    }));
  }

  add(notification: Notification) {
    this.notificationsStore.add(notification);
  }

  update(id, notification: Partial<Notification>) {
    this.notificationsStore.update(id, notification);
  }

  remove(id: ID) {
    this.notificationsStore.remove(id);
  }

}

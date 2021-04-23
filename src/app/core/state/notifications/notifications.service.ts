import { Notification } from 'src/app/core/models/notification';
import { IChat, INotification, NotificationStatus } from 'src/app/data/interfaces/models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestNotificactionService } from '../../../data/api/notification.service';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ProjectsQuery } from '../projects/projects.query';
import { NotificationsStore } from './notifications.store';
import { SessionQuery } from '../session/session.query';
import * as moment from 'moment';
import { NotificationsQuery } from './notifications.query';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  constructor(private notificationsStore: NotificationsStore,
              private notificationsQuery: NotificationsQuery,
              protected notificationService: RestNotificactionService,
              private sessionQuery: SessionQuery,
              private projectsQuery: ProjectsQuery) {
  }


  loadNotifications() {
    const projectId = this.projectsQuery.getActiveId() as number;

    this.notificationService.findAllByProjectId(projectId).subscribe(
        // (notifs: INotification[]) => {
        (notifications: HttpResponse<INotification[]>) => {
          this.notificationsStore.set(notifications.body);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }

  selectNotification(notificationId: number)
  {
    this.notificationsStore.setActive(notificationId);
  }

  updateNotification(notification: Notification)
  {
    // this.notificationsStore.
    this.notificationService.update(notification).subscribe(
      // (notifs:INotification[]) => {
      (notificationResponse: HttpResponse<INotification>) => {
        // store.update(entityId, { name: 'New Name' });
        this.notificationsStore.update(notificationResponse.body.id, notificationResponse.body);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  updateChatNotification(notificationId: number, chat: IChat)
  {
    const notification: Notification = this.notificationsQuery.getEntity(notificationId);
    let notifUpdated = {...notification};
    notifUpdated.chatId = chat.id;

    // this.notificationsStore.
    this.notificationService.update(notifUpdated).subscribe(
      // (notifs:INotification[]) => {
      (notificationResponse: HttpResponse<INotification>) => {
        this.notificationsStore.update(notificationResponse.body.id, { chatId: notificationResponse.body.chatId });
       // this.notificationsStore.update(notificationResponse.body.id, notificationResponse.body);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  createNotification(notification: Notification)
  {
    notification.safeKeepingProjectId = this.projectsQuery.getActiveId() as number;
    notification.status               = NotificationStatus.EMITTED;
    notification.from                 = this.sessionQuery.Me;
    notification.to                   = this.projectsQuery.Partner;
    notification.emittedDate          = moment();

    this.notificationService.create(notification).subscribe(
      // (notifs:INotification[]) => {
      (notificationResponse: HttpResponse<INotification>) => {
        this.notificationsStore.add(notificationResponse.body);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  deleteNotification(notification: Notification)
  {
    // this.notificationsStore.
    this.notificationService.delete(notification.id).subscribe(
      // (notifs:INotification[]) => {
      (notificationResponse: HttpResponse<any>) => {
        // store.update(entityId, { name: 'New Name' });
        this.notificationsStore.remove(notification.id);
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }
}

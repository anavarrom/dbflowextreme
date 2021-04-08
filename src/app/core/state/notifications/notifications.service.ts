import { INotification } from 'src/app/data/interfaces/models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestNotificactionService } from '../../../data/api/notification.service';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ProjectsQuery } from '../projects/projects.query';
import { NotificationsStore } from './notifications.store';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  constructor(private notificationsStore: NotificationsStore,
              protected notificationService: RestNotificactionService,
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
}

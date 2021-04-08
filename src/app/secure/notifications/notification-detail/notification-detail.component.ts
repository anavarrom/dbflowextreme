import { Notification } from './../../../core/models/notification';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INotification } from '../../../data/interfaces/models';
import { Observable } from 'rxjs';
import { NotificationsQuery } from './../../../core/state/notifications/notifications.query';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {

  selectedNotification$: Observable<Notification>;

  @Input() notification: INotification;

  constructor(private route: ActivatedRoute,
              private notificationsQuery: NotificationsQuery) { }

  ngOnInit() {
    // this.selectedNotification$  = this.notificationsQuery.selectActive() as Observable<Notification>;
  }

}

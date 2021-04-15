import { Moment } from 'moment';
import { ToastService } from './../../../shared/services/toast.service';
import { Notification } from './../../../core/models/notification';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INotification } from '../../../data/interfaces/models';
import { Observable } from 'rxjs';
import { NotificationsQuery } from './../../../core/state/notifications/notifications.query';
import { NotificationsService } from './../../../core/state/notifications/notifications.service';
import dxTextBox from 'devextreme/ui/text_box';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {

  selectedNotification$: Observable<Notification>;
  dueDateButtonOptions: any;

   @Input() notification: Notification;
  public notif: Notification;

  // @ViewChild('subject') subjectRef: any;
  // @ViewChild('dueDate') dueDateRef: any;
  // @ViewChild('body') bodyRef: any;

  constructor(private route: ActivatedRoute,
              private notificationsQuery: NotificationsQuery,
              private notificationsService: NotificationsService,
              private toastService: ToastService) { }

  ngOnInit() {
    // this.selectedNotification$  = this.notificationsQuery.selectActive() as Observable<Notification>;
    this.dueDateButtonOptions = {
      stylingMode: 'outlined',
      type: 'normal',
      icon: 'fas fa-clock',
      text: this.notification.dueDate.format('MMM Do YY'),
      onClick: () => {
        // this.toastService.info("ddfgdsg");
      }
    };
  }

/*  saveNotification() {

    // this.notification.subject = this.subjectRef.value;
    // this.notification.dueDate = moment(this.dueDateRef.value);
    // this.notification.body    = this.bodyRef.value;

    this.notificationsService.saveNotification(this.notification);

  }*/
}

import { NotificationsStore } from './../../../core/state/notifications/notifications.store';
import { Notification } from './../../../core/models/notification';
import { NotificationsQuery } from './../../../core/state/notifications/notifications.query';
import { INotification } from './../../../data/interfaces/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from './../../../core/effects/navigation.actions';
import { NotificationDetailComponent } from '../notification-detail/notification-detail.component';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  pendingNotifications$: Observable<INotification[]>;
  receivedNotifications$: Observable<INotification[]>;
  readNotifications$: Observable<INotification[]>;

  selectedNotification$: Observable<Notification>;
  selectedNotification: Notification;

  popupVisible = false;
  position = 'center';
  saveButtonOptions: any;
  // @ViewChild('notificationDetail') child: NotificationDetailComponent;

  constructor( private notificationsQuery: NotificationsQuery,
               private toastService: ToastService,
               private actions: Actions) { }

  ngOnInit(): void {
    this.pendingNotifications$  = this.notificationsQuery.pendingNotifications$;
    this.receivedNotifications$ = this.notificationsQuery.receivedNotifications$;
    this.readNotifications$     = this.notificationsQuery.readNotifications$;
    this.selectedNotification$  = this.notificationsQuery.selectActive() as Observable<Notification>;

    const directions: any = {
          icon: 'rowfield',
          shading: true,
          position: {
              of: '#notificationsView',
              my: 'right bottom',
              at: 'right bottom',
              offset: '-120 -120'
          }
      };
    config({
      floatingActionButtonConfig: directions
    });
    repaintFloatingActionButton();

    this.saveButtonOptions = {
      stylingMode: 'test',
      type: 'normal',
      icon: 'fas fa-save',
      text: '',
      onClick: (event) => {

        this.selectedNotification.dueDate = moment(this.selectedNotification.dueDate);
        this.actions.dispatch(NavigationActions.saveNotificationClicked(this.selectedNotification));
        this.popupVisible = false;
        // this.toastService.info("save!!");
      }
    };
  }

  notificationSelected(event) {
    if (event.addedItems.length > 0 ) {
      /*const chatSelected: Chat  = event.addedItems[0];
      if (chatSelected !== null) {
        let chat: Chat = new Chat();
        chat.id = chatSelected.id;
        this.actions.dispatch(NavigationActions.chatClicked(chat));
      }*/
    }
  }

  notificationClicked(event) {
    if (event.itemData ) {
      const notification: Notification = event.itemData;
      this.popupVisible = true;
      this.actions.dispatch(NavigationActions.notificationClicked(notification));

      this.selectedNotification  = {...notification};

      // this.selectedNotification         = new Notification();
      // this.selectedNotification.id      = notification.id;
      // this.selectedNotification.subject = notification.subject;
      // this.selectedNotification.dueDate = notification.dueDate;
      // this.selectedNotification.body    = notification.body;

    }
  }

  addNotification(){
    this.selectedNotification         = new Notification();
    this.selectedNotification.subject = '';
    this.selectedNotification.dueDate = moment();
    this.selectedNotification.body    = '';
    this.popupVisible = true;
  }

  click(event){
    this.toastService.info('yuju!!!!');
  }
}

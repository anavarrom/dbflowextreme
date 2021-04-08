import { Notification } from './../../../core/models/notification';
import { NotificationsQuery } from './../../../core/state/notifications/notifications.query';
import { INotification } from './../../../data/interfaces/models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from './../../../core/effects/navigation.actions';

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

  popupVisible = false;
  position = 'center';


  constructor( private notificationsQuery: NotificationsQuery,
               private toastService: ToastService,
               private actions: Actions) { }

  ngOnInit(): void {
    this.pendingNotifications$  = this.notificationsQuery.pendingNotifications$;
    this.receivedNotifications$ = this.notificationsQuery.receivedNotifications$;
    this.readNotifications$     = this.notificationsQuery.readNotifications$;
    this.selectedNotification$  = this.notificationsQuery.selectActive() as Observable<Notification>;
  }

  notificationSelected(event) {
    this.toastService.info("selected!!!");
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
    }
  }
  click(event){
    this.toastService.info("yuju!!!!");
  }

}

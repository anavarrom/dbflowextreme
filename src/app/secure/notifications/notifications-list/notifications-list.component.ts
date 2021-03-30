import { NotificationsQuery } from './../../../core/state/notifications/notifications.query';
import { INotification } from './../../../data/interfaces/models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  notifications$: Observable<INotification[]>;
  homeButtonOptions: any;
  drawerButtonOptions: any;

  constructor( private notificationsQuery: NotificationsQuery, private toastService: ToastService) { }

  ngOnInit(): void {
    this.notifications$ = this.notificationsQuery.selectAll();

    this.drawerButtonOptions = {
      icon: 'fas fa-bars',
      onClick: () => {
        this.toastService.info("yuju!!!!");
      }
    };
    this.homeButtonOptions = {
      icon: 'fas fa-home',
      text: 'Home',
      onClick: () => {
        this.toastService.info("yuju!!!!");
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
  click(event){
    this.toastService.info("yuju!!!!");
  }

}

import { INotification} from './../../../data/interfaces/models';
import { Component, Input, OnInit } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from '../../../core/effects/navigation.actions';
import { Chat } from '../../../core/models/chat';

@Component({
  selector: 'app-notification-card-list',
  templateUrl: './notification-card-list.component.html',
  styleUrls: ['./notification-card-list.component.scss']
})
export class NotificationCardListComponent implements OnInit {

  constructor( private actions: Actions ) { }
  popupVisible = false;
  chatButtonOptions: any;
  dueDateButtonOptions: any;
  @Input() notification: INotification;
  position = 'right top';

  ngOnInit(): void {
    // YYYY-MM-DD
    this.dueDateButtonOptions = {
      icon: 'fas fa-clock',
      text: this.notification.dueDate.format('MMM Do YY'),
      onClick: () => {
      }
    };

    this.chatButtonOptions = {
      icon: 'fas fa-comments',
      text: '',
      onClick: (event) => {
        this.popupVisible = true;
        const chat: Chat = new Chat();
        chat.id = this.notification.chatId;

        this.actions.dispatch(NavigationActions.chatClicked(chat));
        event.stopPropagation();
      }
    };
  }
}

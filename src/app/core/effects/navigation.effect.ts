import { NotificationsQuery } from './../state/notifications/notifications.query';
import { NotificationsService } from './../state/notifications/notifications.service';
import { ChatsService } from './../state/chats/chats.service';
import { ProjectsService } from './../state/projects/projects.service';
import { SessionService } from './../state/session/session.service';
import { AppointmentsService } from './../state/appointments/appointments.service';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { NavigationActions } from './navigation.actions';
import { Chat } from '../models/chat';
import { Notification } from '../models/notification';

@Injectable()
export class NavigationEffects {
  constructor(
    private actions$: Actions,
    private appointmentsService: AppointmentsService,
    private notificationsService: NotificationsService,
    private chatsService: ChatsService,
    private sessionService: SessionService,
    private projectsService: ProjectsService,
    private notificationsQuery: NotificationsQuery,
  ) { }
  /*
    loadMainNavigation$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadMainNavigation),
        switchMap((_) =>
           this.navigationService.loadMainNavigation().pipe(
             map((mainNav) => loadMainNavigationSuccess({ mainNav }))
          )
        )
      ), { dispatch: true }
    );

    // Or use the decorator
    @Effect()
    loadMainNavigationSuccess$ = this.actions$.pipe(
      ofType(loadMainNavigationSuccess),
      map(({ mainNav }) => this.navigationService.updateNavigationTree(mainNav)),
      tap((mainRoutes) => this.store.updateNavigation(mainRoutes))
    );*/

  @Effect()
  calendarClickedSuccess$ = this.actions$.pipe(
    ofType(NavigationActions.calendarsClicked),
    map((_) => {
      this.appointmentsService.loadAppointments();
    }
    ));

  @Effect()
  notificationClickedSuccess$ = this.actions$.pipe(
    ofType(NavigationActions.notificationsClicked),
    map((_) => {
      this.notificationsService.loadNotifications();
    }
    ));

  @Effect()
  chatsClickedSuccess$ = this.actions$.pipe(
    ofType(NavigationActions.chatsClicked),
    map((_) => {
      this.chatsService.initChats();
    }
    ));

  @Effect()
  chatClickedSuccess = this.actions$.pipe(
    ofType(NavigationActions.chatClicked),
    map((chat: Chat) => {
      this.chatsService.selectChat(chat.id);
    }
    ));

  @Effect()
  notificationClickedSuccess = this.actions$.pipe(
    ofType(NavigationActions.notificationClicked),
    map((notification: Notification) => {
      this.notificationsService.selectNotification(notification.id);
    }
    ));

  @Effect()
  saveNotificationClickedSuccess = this.actions$.pipe(
    ofType(NavigationActions.saveNotificationClicked),
    map((notification: Notification) => {
      // Check if this is update or create
      if (notification.id) {
        // Find the notification
       // let notifReal = this.notificationsQuery.getEntity(notification.id);
       // if (notifReal) {
       //   notifReal.subject = notification.subject;
       //   notifReal.body    = notification.body;
       //   notifReal.dueDate = notification.dueDate;

        this.notificationsService.updateNotification(notification);
       // }
      } else {
        this.notificationsService.createNotification(notification);
      }
      // this.notificationsService.selectNotification(notification.id);
    }
    ));
}

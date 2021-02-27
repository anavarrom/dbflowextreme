import { ChatsService } from './../state/chats/chats.service';
import { ProjectsService } from './../state/projects/projects.service';
import { SessionService } from './../state/session/session.service';
import { AppointmentsService } from './../state/appointments/appointments.service';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { NavigationActions } from './navigation.actions';
import { Chat } from '../models/chat';

@Injectable()
export class NavigationEffects {
  constructor(
    private actions$: Actions,
    private appointmentsService: AppointmentsService,
    private chatsService: ChatsService,
    private sessionService: SessionService,
    private projectsService: ProjectsService,
  ) {}
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
  chatsClickedSuccess$ = this.actions$.pipe(
    ofType(NavigationActions.chatsClicked),
    map((_) => {
      this.chatsService.initChats();
    }
  ));

  @Effect()
  chatClickedSuccess = this.actions$.pipe(
    ofType(NavigationActions.chatClicked),
    map((chat:Chat) => {
      this.chatsService.selectChat(chat.id);
    }
   ));
}

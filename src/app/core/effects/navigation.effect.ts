import { ChatsService } from './../state/chats/chats.service';
import { ProjectsService } from './../state/projects/projects.service';
import { SessionService } from './../state/session/session.service';
import { AppointmentsService } from './../state/appointments/appointments.service';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { NavigationActions } from './navigation.actions';

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
    ofType(NavigationActions.calendarClicked),
    map((_) => {
      this.appointmentsService.loadAppointments();
    }
  ));

  @Effect()
  chatClickedSuccess$ = this.actions$.pipe(
    ofType(NavigationActions.chatClicked),
    map((_) => {
      this.chatsService.loadChats();
    }
  ));
}

import { ProjectsService } from './../state/projects/projects.service';
import { SessionService } from './../state/session/session.service';
import { AppointmentsService } from './../state/appointments/appointments.service';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@datorama/akita-ng-effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { SessionActions} from './session.actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private appointmentsService: AppointmentsService,
    private sessionService: SessionService,
    private projectsService: ProjectsService,
  ) {}

  @Effect()
  loginSuccess = this.actions$.pipe(
    ofType(SessionActions.loginSuccess),
    map((_) => {
      this.sessionService.loginSusccesfull();
    }
  ));

  @Effect()
  raiseError = this.actions$.pipe(
    ofType(SessionActions.raiseError),
    map((error) => {
      this.sessionService.registerLastError(error);
    }
   ));
}

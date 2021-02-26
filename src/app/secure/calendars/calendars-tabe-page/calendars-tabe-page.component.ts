import { AppointmentsService } from './../../../core/state/appointments/appointments.service';
import { AppointmentsQuery } from './../../../core/state/appointments/appointments.query';
import { Component, OnInit } from '@angular/core';
import { IAppointment, IChat, ISafeKeepingPeriod, IDbFlowAccount } from 'src/app/data/interfaces/models';
import { Appointment } from 'src/app/core/models/appointment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Observable } from 'rxjs';
import { ProjectsQuery } from 'src/app/core/state/projects/projects.query';
import { ProjectsService } from 'src/app/core/state/projects/projects.service';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { SessionStore } from 'src/app/core/state/session/session.store';
import { SafeKeepingPeriodsMap } from 'src/app/core/models/safekeepingPeriod';
import { SessionActions } from 'src/app/core/effects/session.actions';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from 'src/app/core/effects/navigation.actions';

@Component({
  selector: 'app-calendars-tabe-page',
  templateUrl: './calendars-tabe-page.component.html',
  styleUrls: ['./calendars-tabe-page.component.scss'],
})
export class CalendarsTabePageComponent implements OnInit {

  // @Select(SafekeepingStore.allPeriods)
  periods$: Observable<ISafeKeepingPeriod[]>;
  // @Select(AppointmentStore.all)
  appointments$: Observable<IAppointment[]>;
  // @Select(AppointmentStore.selected)
  selected$: Observable<IAppointment>;

  protected me: string | null;
  protected periodsByDate: SafeKeepingPeriodsMap;

  addButtonOptions: any;
  selectedAppointment: IAppointment;
  currentDate: Date = new Date();
  isDrawerOpen = false;

  constructor( private sessionQuery: SessionQuery,
               private projectsQuery: ProjectsQuery,
               private appointmentsQuery: AppointmentsQuery,
               private appointmentsService: AppointmentsService,
               private toastService: ToastService,
               private actions: Actions) {
  }

  ngOnInit() {
    // this.appointmentsService.loadAppointments();
    // this.actions.dispatch(NavigationActions.calendarClicked());

    this.me = this.sessionQuery.Me;
    this.periodsByDate = this.projectsQuery.PeriodsByDate;
    this.appointments$ = this.appointmentsQuery.selectAll();

  // TODO: Debería de haber una forma más inteligente de cargar los appointments
    this.addButtonOptions = {
      icon: 'plus',
       onClick: (e) => {
        // this.store.dispatch(new GoToChatFromAppointmentAttempt(this.selectedAppointment));
       }
   };
  }


  goToChatFromAppointment(e){
    // this.isDrawerOpen = true;

    /*this.store.dispatch(new GoToChatFromAppointmentAttempt(this.selectedAppointment));
    e.event.preventDefault();
    e.event.stopPropagation();
    e.cancel = true;*/
  }



  onAppointmentClicked(e) {
    /*const appSelected: Appointment  = e.appointmentData;
    if (appSelected !== null) {
      this.store.dispatch(new SelectAppointment(appSelected.id));
      this.selectedAppointment = appSelected;

      // this.toastService.info('Selected ' + appSelected.text);
    }*/
  }

  onAppointmentFormOpening(e) {
    /*e.event.preventDefault();
    e.event.stopPropagation();
    e.cancel = true;
    */
  }

  markWeekEnd(cellData, periodDate: ISafeKeepingPeriod) {
    if (!periodDate)
      return;

    // Check the user
    var classObject = {};
    if (periodDate.owner === this.me) {
      classObject["safekeeping_period_me"] = true;
    } else {
      classObject["safekeeping_period_other"] = true;
    }
    return classObject;
  }
}

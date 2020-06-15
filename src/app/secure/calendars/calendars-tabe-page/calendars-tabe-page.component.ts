import { Component, OnInit } from '@angular/core';
import { Store, Actions, Select, ofActionDispatched, ofActionSuccessful, ofActionCompleted } from '@ngxs/store';
import { LoadAppointments, SelectAppointment } from 'src/app/core/actions/appointments.actions';
import { AppointmentStore } from 'src/app/core/states/appointment.state';
import { Observable } from 'rxjs';
import { IAppointment, IChat, ISafeKeepingPeriod, IDbFlowAccount } from 'src/app/data/interfaces/models';
import { Appointment } from 'src/app/core/models/appointment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GoToChatFromAppointmentAttempt, GoToChatFromAppointmentSucces, SelectChat } from 'src/app/core/actions/chat.action';
import { Navigate } from '@ngxs/router-plugin';
import { ChatStore } from 'src/app/core/states/chat.state';
import { SafekeepingStore } from 'src/app/core/states/safekeeping.state';
import { LoadSafeKeepingPeriods } from 'src/app/core/actions/project.actions';
import { SessionState, SessionStore } from 'src/app/core/states/session.state';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';

@Component({
  selector: 'app-calendars-tabe-page',
  templateUrl: './calendars-tabe-page.component.html',
  styleUrls: ['./calendars-tabe-page.component.scss'],
})
export class CalendarsTabePageComponent implements OnInit {

  @Select(SafekeepingStore.allPeriods)       public periods$: Observable<ISafeKeepingPeriod[]>;
  @Select(SafekeepingStore.allPeriodsByDate) public periodsByDate$: Observable<Map<string, ISafeKeepingPeriod> >;
  @Select(AppointmentStore.all)       public appointments$: Observable<IAppointment[]>;
  @Select(AppointmentStore.selected)  public selected$: Observable<IAppointment>;
  
  @SelectSnapshot(SessionStore.currentUser) user: IDbFlowAccount | null;

  addButtonOptions: any;
  selectedAppointment: IAppointment;
  currentDate: Date = new Date();
  isDrawerOpen = false;

  constructor( private store: Store,
               private actions$: Actions,
               private toastService: ToastService) {

    this.actions$
    .pipe(ofActionCompleted(GoToChatFromAppointmentSucces)).subscribe( chat  => {
      this.store.dispatch(new SelectChat(chat.action.chat.id));
      this.isDrawerOpen = true;
    });
    this.addButtonOptions = {
      icon: 'plus',
      // onClick: (e) => {
        // this.store.dispatch(new GoToChatFromAppointmentAttempt(this.selectedAppointment));
      // }
   };
  }

  goToChatFromAppointment(e){
    // this.isDrawerOpen = true;

    this.store.dispatch(new GoToChatFromAppointmentAttempt(this.selectedAppointment));
    e.event.preventDefault();
    e.event.stopPropagation();
    e.cancel = true;
  }

  ngOnInit() {
    // TODO: Debería de haber una forma más inteligente de cargar los appointments
    this.store.dispatch(new LoadAppointments());
    this.store.dispatch(new LoadSafeKeepingPeriods());
  }

  /**
   * Select the appointment
   *
   * @remarks
   * This method throws the select action to the state
   *
   * @param e - event
   */  
  onAppointmentClicked(e) {
    const appSelected: Appointment  = e.appointmentData;
    if (appSelected !== null) {
      this.store.dispatch(new SelectAppointment(appSelected.id));
      this.selectedAppointment = appSelected;

      // this.toastService.info('Selected ' + appSelected.text);
    }
  }

  onAppointmentFormOpening(e) {
    e.event.preventDefault();
    e.event.stopPropagation();
    e.cancel = true;
  }

  markWeekEnd(cellData, periodDate: ISafeKeepingPeriod) {
    if (!periodDate)
      return;

    // Check the user 
    var classObject = {};
    if (periodDate.owner === this.user.username) {
      classObject["safekeeping_period_me"] = true;
    } else {
      classObject["safekeeping_period_other"] = true;
    }
    return classObject;
  }

}

import { Component, OnInit } from '@angular/core';
import { Store, Actions, Select, ofActionDispatched, ofActionSuccessful, ofActionCompleted } from '@ngxs/store';
import { LoadAppointments, SelectAppointment } from 'src/app/core/actions/appointments.actions';
import { AppointmentStore } from 'src/app/core/states/appointment.state';
import { Observable } from 'rxjs';
import { IAppointment, IChat } from 'src/app/data/interfaces/models';
import { Appointment } from 'src/app/core/models/appointment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GoToChatFromAppointmentAttempt, GoToChatFromAppointmentSucces, SelectChat } from 'src/app/core/actions/chat.action';
import { Navigate } from '@ngxs/router-plugin';
import { ChatStore } from 'src/app/core/states/chat.state';

@Component({
  selector: 'app-calendars-tabe-page',
  templateUrl: './calendars-tabe-page.component.html',
  styleUrls: ['./calendars-tabe-page.component.scss'],
})
export class CalendarsTabePageComponent implements OnInit {

  @Select(AppointmentStore.all)       public appointments$: Observable<IAppointment[]>;
  @Select(AppointmentStore.selected)  public selected$: Observable<IAppointment>;

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
}

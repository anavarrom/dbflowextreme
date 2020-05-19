import { Component, OnInit } from '@angular/core';
import { Store, Actions, Select } from '@ngxs/store';
import { LoadAppointments } from 'src/app/core/actions/appointments.actions';
import { AppointmentStore } from 'src/app/core/states/appointment.state';
import { Observable } from 'rxjs';
import { IAppointment } from 'src/app/data/interfaces/models';

@Component({
  selector: 'app-calendars-tabe-page',
  templateUrl: './calendars-tabe-page.component.html',
  styleUrls: ['./calendars-tabe-page.component.scss'],
})
export class CalendarsTabePageComponent implements OnInit {

  @Select(AppointmentStore.all) public appointments$: Observable<IAppointment[]>;
  currentDate: Date = new Date();

  constructor(private store: Store, private actions$: Actions) { }

  ngOnInit() {
    this.store.dispatch(new LoadAppointments());

  }

}

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AppointmentsStore, AppointmentsState } from './appointments.store';

@Injectable({ providedIn: 'root' })
export class AppointmentsQuery extends QueryEntity<AppointmentsState> {

  constructor(protected store: AppointmentsStore) {
    super(store);
  }

  /*allAppointments$ = this.select(state => {
      this.selectAll
      const project: SafeKeepingProject  = this.getActive() as SafeKeepingProject;
    return project.periods;
  });*/

}

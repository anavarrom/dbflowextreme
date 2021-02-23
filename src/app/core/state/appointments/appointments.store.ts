import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Appointment } from '../../models/appointment'

export interface AppointmentsState extends EntityState<Appointment> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'appointments' })
export class AppointmentsStore extends EntityStore<AppointmentsState> {

  constructor() {
    super();
  }
}

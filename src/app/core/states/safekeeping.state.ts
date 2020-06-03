import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { LoadAppointments, SelectAppointment } from '../actions/appointments.actions';
import * as R from 'ramda';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/data/api/appointment.service';
import { IAppointment, ISafeKeepingPeriod } from 'src/app/data/interfaces/models';
import { SafeKeepingPeriod } from '../models/safekeepingPeriod';
import { SafeKeepingPeriodService } from 'src/app/data/api/safekeepingperiod.service';
import { LoadSafeKeepingPeriods, NewSafeKeepingPeriod, UpdateSafeKeepingPeriod } from '../actions/project.actions';
import { patch, insertItem, updateItem } from '@ngxs/store/operators';

// Create an interface for
export interface SafekeepingState {
    safekeepingPeriods: SafeKeepingPeriod[];
    size: number;
    selectedId: number;
}

// Creamos nuestro estado con la anotación @State
@State({
    name: 'safekeeping',
    defaults: {
      safekeepingPeriods: [],
      size: 0,
      selectedId: 0,
    }
})
@Injectable()
export class SafekeepingStore {

    constructor(private store: Store,
                private safeKeepingService: SafeKeepingPeriodService) {
    }

    @Selector()
    static all(state: SafekeepingState): SafeKeepingPeriod[] {
      return state.safekeepingPeriods;
    }


    @Selector()
    static selected(state: SafekeepingState): SafeKeepingPeriod | null {
      return R.find((app: SafeKeepingPeriod) => (app.id  === state.selectedId), state.safekeepingPeriods);
    }

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(LoadSafeKeepingPeriods)
    LoadSafeKeepingPeriods(stateContext: StateContext<SafekeepingState>) {
        this.safeKeepingService.query().subscribe(
            // (notifs: INotification[]) => {
            (periods: HttpResponse<ISafeKeepingPeriod[]>) => {

              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ safekeepingPeriods: periods.body, size: periods.body.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );
    }

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(NewSafeKeepingPeriod)
    NewSafeKeepingPeriod(stateContext: StateContext<SafekeepingState>, action: NewSafeKeepingPeriod) {
      const period: SafeKeepingPeriod = action.period;
      this.safeKeepingService.create(period).subscribe(
        (periodCreated: HttpResponse<SafeKeepingPeriod>) => {
          stateContext.setState(
            patch({
              safekeepingPeriods: insertItem<ISafeKeepingPeriod>(periodCreated.body)
            }));
          }, err => {
          // Log errors if any
          // TODO: Lanzar error
          /// actionsFailure.error.text = "No chats found";
          // this.store.dispatch(new GoToChatFromAppointmentFailure({}));
        }
      );
    }
    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(UpdateSafeKeepingPeriod)
    UpdateSafeKeepingPeriod(stateContext: StateContext<SafekeepingState>, action: UpdateSafeKeepingPeriod) {
      // let selectedPeriod: SafeKeepingPeriod = R.find((p: SafeKeepingPeriod) => (chat.id  === action.id), stateContext.getState().chats);
      let selectedPeriod: SafeKeepingPeriod =
        R.find((period: SafeKeepingPeriod) => (period.id  === action.period.id), stateContext.getState().safekeepingPeriods);
      if (!selectedPeriod) {
        // TODO: Lanzar error
        return;
      }
      this.safeKeepingService.update(action.period).subscribe(
        (periodUpdated: HttpResponse<SafeKeepingPeriod>) => {
          stateContext.setState(
            patch({
              safekeepingPeriods: updateItem<ISafeKeepingPeriod>(period => period.id === periodUpdated.body.id, periodUpdated.body)
            }));
          }, err => {
          // Log errors if any
          // TODO: Lanzar error
          /// actionsFailure.error.text = "No chats found";
          // this.store.dispatch(new GoToChatFromAppointmentFailure({}));
        }
      );
    }
 }
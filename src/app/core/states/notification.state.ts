import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { LoadNotifications, SelectNotification } from '../actions/notification.actions';
import { NotificactionsService } from 'src/app/data/api/notifications.service';
import { INotification, NotificationStatus } from 'src/app/data/interfaces/models';

import * as R from 'ramda';
import { Notification } from '../models/notification';

// import { Notification, INotification                 } from '../models/notification';
// import { PaginateOptions, IPaginateResult2            } from '../services/basePagination';


function isRead(notif: INotification) {
  return (notif.status === NotificationStatus.READ);
}

function isReceived(notif: INotification) {
  return (notif.status !== NotificationStatus.READ);
}


// Create an interface for
export interface NotificationState {
    // notifications: Notification[];
    pendingNotifs: Notification[];
    readNotifs: Notification[];
    pendingSize: number;
    readSize: number;
    selectedId: number;
}

// Creamos nuestro estado con la anotación @State
// Le damos el tipo al estado.
// Le damos nombre al 'slice' o partición del estado.
// Damos valor por defecto al estado.
@State({
    name: 'notification',
    defaults: {
      pendingNotifs: [],
      readNotifs: [],
      pendingSize: 0,
      readSize: 0,
      selectedId: 0
    }
})
export class NotificationStore {
    // private notificationOptions: PaginateOptions   = null;

    constructor(/*private store: Store,private notifService: NotificactionsService*/) {
        // this.notificationOptions        = new PaginateOptions();
        // this.notificationOptions.limit  = 50;
        // this.notificationOptions.page   = 0;
    }

    @Selector()
    // @ImmutableSelector()
    static pending(state: NotificationState): Notification[] {
      return state.pendingNotifs;
    }

    @Selector()
    // @ImmutableSelector()
    static read(state: NotificationState): Notification[] {
      return state.readNotifs;
    }

    @Selector()
    static selected(state: NotificationState): Notification | null {
      // tslint:disable-next-line: only-arrow-functions
      // return R.find( function(n: Notification) { return (n.id  === state.selectedPendingId); }, state.pendingNotifs);
      return R.find((n: Notification) => (n.id  === state.selectedId), state.pendingNotifs) ||
             R.find((n: Notification) => (n.id  === state.selectedId), state.readNotifs);
    }

    /*@Selector()
    static selectedRead(state: NotificationState): Notification | null {
      return R.find((n: Notification) => (n.id  === state.selectedReadId), state.readNotifs);
    }*/

    @Action(LoadNotifications)
    LoadNotifications(stateContext: StateContext<NotificationState>) {
      /*  this.notifService.apiNotificationsGet().subscribe(
            // (notifs: INotification[]) => {
            (notifs: INotification[]) => {
              const filterRead = R.filter(isRead);
              const filterReceived = R.filter(isReceived);

              const rNotifs: Notification[] = filterRead(notifs) as Notification[];
              const receivedNotifs: Notification[] = filterReceived(notifs) as Notification[];

              // const notifs2: Notification[] = notifs.docs as Notification[];

              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ pendingNotifs: receivedNotifs, pendingSize: receivedNotifs.length });
              stateContext.patchState({ readNotifs: rNotifs, readSize: rNotifs.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );*/
    }

    @Action(SelectNotification)
    SelectNotification(stateContext: StateContext<NotificationState>, action: SelectNotification) {
      stateContext.patchState({ selectedId: action.id});
    }

/*    @Action(SelectReadNotification)
    SelectPeSelectReadNotificationndingNotification(stateContext: StateContext<NotificationState>, action: SelectReadNotification) {
      stateContext.patchState({ selectedReadId: action.id});
    }*/

  }

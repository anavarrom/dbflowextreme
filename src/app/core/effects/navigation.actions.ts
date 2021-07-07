import { Chat } from 'src/app/core/models/chat';
import { Notification } from 'src/app/core/models/notification';
import { createAction, props } from '@datorama/akita-ng-effects';

// tslint:disable-next-line: no-namespace
export namespace NavigationActions {
  export const searchClicked              = createAction('[Navigation] Search');

  export const calendarsClicked           = createAction('[Navigation] Click Calendars');

  export const notificationsClicked       = createAction('[Navigation] Click Notifications');
  export const notificationClicked        = createAction('[Navigation] Click Notification', props<Notification>());
  export const saveNotificationClicked    = createAction('[Navigation] Save Notification', props<Notification>());
  export const deleteNotificationClicked  = createAction('[Navigation] Delete Notification', props<Notification>());
  export const openChatFromNotificationClicked  = createAction('[Navigation] Open Chat', props<Notification>());

  export const chatsClicked     = createAction('[Navigation] Click Chats');
  export const chatClicked      = createAction('[Navigation] Click Chat', props<Chat>());

  // export const addTodo = createAction("[Todo] Add Todo", props<{todo: Todo}>())
}


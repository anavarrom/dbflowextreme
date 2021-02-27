import { Chat } from 'src/app/core/models/chat';
import { createAction, props } from "@datorama/akita-ng-effects";

export namespace NavigationActions {
  export const calendarsClicked = createAction('[Navigation] Click Calendars')
  export const chatsClicked     = createAction('[Navigation] Click Chats')
  export const chatClicked      = createAction("[Navigation] Click Chat", props<Chat>())

  // export const addTodo = createAction("[Todo] Add Todo", props<{todo: Todo}>())
}


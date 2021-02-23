import { createAction } from "@datorama/akita-ng-effects";

export namespace NavigationActions {
  export const calendarClicked = createAction('[Navigation] Click Calendar')

  // export const addTodo = createAction("[Todo] Add Todo", props<{todo: Todo}>())
}


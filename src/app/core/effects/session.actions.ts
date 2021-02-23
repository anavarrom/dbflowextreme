import { createAction, props } from "@datorama/akita-ng-effects";
import { DbFlowError } from "../models/error";

export namespace SessionActions {
  export const loginSuccess    = createAction('[Session] Login Success')
 // export const raiseError      = createAction("[Session] Raise Error", props<{error: DbFlowAccount}>())
  export const raiseError      = createAction("[Session] Raise Error", props<DbFlowError>())
}

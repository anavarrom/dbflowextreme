import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IDbFlowAccount, IDbAccountConfiguration } from 'src/app/data/interfaces/models';

export interface SessionState {
  userAccount: IDbFlowAccount;
  userConfig: IDbAccountConfiguration;
  isAuthenticated: boolean;
}

export function createInitialState(): SessionState {
  return {
    userAccount : null,
    userConfig: null,
    isAuthenticated:false
};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

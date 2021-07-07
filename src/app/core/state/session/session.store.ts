import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IDbFlowAccount, IDbAccountConfiguration } from 'src/app/data/interfaces/models';
import { DbFlowError } from '../../models/error';

export interface SessionState {
  userAccount: IDbFlowAccount;
  userConfig: IDbAccountConfiguration;
  lastError: DbFlowError;
  isAuthenticated: boolean;

  lastSearchResult: string;
}

export function createInitialState(): SessionState {
  return {
    userAccount : null,
    userConfig: null,
    lastError: null,
    isAuthenticated:false,
    lastSearchResult : ''
};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

import { IDbAccountConfiguration } from './../../../data/interfaces/models';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

  lastError$ = this.select(state => state.lastError);
  isLoggedIn$ = this.select(state => state.isAuthenticated);
  me$ = this.select(state => state.userAccount.username);

  constructor(protected store: SessionStore) {
    super(store);
  }

  get Me() : string {
   return this.getValue().userAccount.username;
  }

  get UserConfig() : IDbAccountConfiguration {
   return this.getValue().userConfig;
  }
}

import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Logout, Login, Init } from '../actions/session.actions';
import { DbFlowAccount, DbAccountConfiguration } from '../models/account';
import { IDbFlowAccount, IDbAccountConfiguration } from 'src/app/data/interfaces/models';
import { LoadSafeKeepingProjects } from '../actions/project.actions';

export interface SessionState {
    userAccount: IDbFlowAccount;
    userConfig: IDbAccountConfiguration;
}

// 
@State({
    name: 'session_store',
    defaults: {
        userAccount : null,
        userConfig: null
    }
})
@Injectable()
export class SessionStore {

    constructor(private store: Store) {
    }

    @Selector()
    static currentUser(state: SessionState): IDbFlowAccount | null {
      return state.userAccount;
    }

    @Selector()
    static userConfiguration(state: SessionState): IDbAccountConfiguration | null {
      return state.userConfig;
    }

    @Selector()
    static me(state: SessionState): string | null {
      return state.userAccount.username;
    }

    @Selector()
    static isLoggedIn(state: SessionState): boolean {
      return (state.userAccount != null);
    }

    @Action(Login)
    Login(stateContext: StateContext<SessionState>, action: Login) {
        const account: DbFlowAccount = {
            username: action.loginData.username,
            firstName: action.loginData.firstName,
            lastName: action.loginData.lastName,
            enabled: action.loginData.enabled,
            email: action.loginData.email,
            authorities: [],
            imageUrl: ''
        };

        const config: DbAccountConfiguration = {
          myBackgroundColor: 'lightblue',
          otherBackgoundColor: 'lightcoral'
        };

        stateContext.patchState({ userAccount: account, userConfig: config});

        this.store.dispatch( new Init());
      }

    @Action(Init)
    Init(stateContext: StateContext<SessionState>, action: Init) {
      // Cargamos los proyectos
      this.store.dispatch( new LoadSafeKeepingProjects());
    }

    @Action(Logout)
    Logout(stateContext: StateContext<SessionState>) {
    }
}

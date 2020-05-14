import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Logout, Login } from '../actions/session.actions';
import { DbFlowAccount } from '../models/account';
import { IDbFlowAccount } from 'src/app/data/interfaces/models';

export interface SessionState {
    userAccount: IDbFlowAccount;
}

// 
@State({
    name: 'session_store',
    defaults: {
        userAccount : null
    }
})
@Injectable()
export class SessionStore {

    @Selector()
    static currentUser(state: SessionState): IDbFlowAccount | null {
      return state.userAccount;
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

        stateContext.patchState({ userAccount: account });
    }

    @Action(Logout)
    Logout(stateContext: StateContext<SessionState>) {
    }
}

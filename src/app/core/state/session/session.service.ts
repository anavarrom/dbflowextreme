import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { tap } from 'rxjs/operators';
import { DbAccountConfiguration, DbFlowAccount } from '../../models/account';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private http: HttpClient, public oktaAuth: OktaAuthService ) {
  }

  async loginSusccesfull() {

    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.sessionStore.update({ isAuthenticated: isAuthenticated });

    this.oktaAuth.getUser().then(value => {
      // const user:UserClaims = value;
      const account: DbFlowAccount = {
        username: value.preferred_username,
        firstName: value.given_name,
        lastName: value.given_name,
        enabled: true,
        email: value.preferred_username,
        authorities: [],
        imageUrl: ''
      };
      this.sessionStore.update({ userAccount: account });
    });

    const config: DbAccountConfiguration = {
      myBackgroundColor: 'lightblue',
      otherBackgoundColor: 'lightcoral'
    };
    this.sessionStore.update({ userConfig: config });
  }

  logout() {
    this.sessionStore.update({ isAuthenticated: false });
    this.oktaAuth.signOut();
  }

  login() {
    this.oktaAuth.signInWithRedirect();
  }
}

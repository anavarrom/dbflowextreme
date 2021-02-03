import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { tap } from 'rxjs/operators';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private http: HttpClient, public oktaAuth: OktaAuthService ) {
  }

  async login() {

    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.sessionStore.update({ isAuthenticated: isAuthenticated });
  }
}

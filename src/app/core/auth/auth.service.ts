import { DbFlowAccount } from './../models/account';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Store } from '@ngxs/store';
import { Login, Logout } from '../actions/session.actions';


@Injectable()
export class dbFlowAuthService {

  isAuthenticated: boolean;

  // $isAuthenticated: Observable<boolean>;
  private observer: Observer<boolean>;
  constructor(private router: Router, private store: Store, private oktaAuth: OktaAuthService, private toast: ToastService) {

    /*this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => { 
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          // TODO: Que hacemos??
        } else {
        }
    });*/
  }

  public login() {
    // Launches the login redirect.
    this.oktaAuth.loginRedirect('/home');
  }

  public logout() {
    this.store.dispatch( new Logout());
    this.oktaAuth.logout();
  }
}
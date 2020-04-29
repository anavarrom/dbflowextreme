import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable()
export class AuthService {
  loggedIn = true;

  constructor(private router: Router, private store: Store) {}

  logIn(login: string, passord: string) {
    this.loggedIn = true;
    this.store.dispatch(new Navigate(['/']));
  }

  logOut() {
    this.loggedIn = false;

    this.store.dispatch(new Navigate(['/login-form']));

    // this.router.navigate(['/login-form']);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}

/*
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const isLoggedIn = this.authService.isLoggedIn;
        const isLoginForm = route.routeConfig.path === 'login-form';

        if (isLoggedIn && isLoginForm) {
            this.router.navigate(['/']);
            return false;
        }

        if (!isLoggedIn && !isLoginForm) {
            this.router.navigate(['/login-form']);
        }

        return isLoggedIn || isLoginForm;
    }
}*/

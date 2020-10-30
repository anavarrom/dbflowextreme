import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { LoadSafeKeepingProjects } from 'src/app/core/actions/project.actions';
import { Login } from 'src/app/core/actions/session.actions';
import { DbFlowAccount } from 'src/app/core/models/account';
import { SessionStore } from 'src/app/core/states/session.state';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  @Select(SessionStore.isLoggedIn) public isLoggedIn$: Observable<boolean>;
  isAuthenticated: boolean;
  
  constructor(private store: Store, private oktaAuth: OktaAuthService, private toast: ToastService) {}
  

   ngOnInit() {
    this.oktaAuth.getUser().then(value => {
      const user:UserClaims = value;
      this.manageAuthentication(user);
    });

  }

  async getConnected() {
    return await this.oktaAuth.getUser();
  }

  private async manageAuthentication(userClaims: UserClaims) {
    // const user = await this.oktaAuth.getUser();
    const account: DbFlowAccount = {
      username: userClaims.email,
      firstName: userClaims.email,
      lastName: userClaims.email,
      enabled: true,
      email: userClaims.email,
      authorities: [],
      imageUrl: ''
    };
    this.store.dispatch(new Login(account));
  }
}

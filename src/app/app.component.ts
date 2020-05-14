import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Store } from '@ngxs/store';
import { Login } from './core/actions/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  userDetails: KeycloakProfile;
 
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService,
              private screen: ScreenService,
              public appInfo: AppInfoService,
              private store: Store,
              private keycloakService: KeycloakService) { }

  isAutorized() {
    return this.authService.isLoggedIn;
  }

  async ngOnInit() {

    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();

      this.store.dispatch(new Login(this.userDetails));
    }
  }

  async doLogout() {
    await this.keycloakService.logout();
  }
}

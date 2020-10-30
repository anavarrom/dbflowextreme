import { ToastService } from './shared/services/toast.service';
import { Component, HostBinding } from '@angular/core';
import {  ScreenService, AppInfoService } from './shared/services';
import { Store } from '@ngxs/store';
import { Login, Logout } from './core/actions/session.actions';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'okta-app';

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
              private screen: ScreenService,
              public appInfo: AppInfoService) { 
    // get authentication state for immediate use
    // await this.isAuthenticated = this.oktaAuth.isAuthenticated();

    // subscribe to authentication state changes
  }
  
  async isAutorized() {
    // let isA: boolean;

    // isA = await this.oktaAuth.isAuthenticated();
    
    return true;
  }

  async ngOnInit() {

  }

  async doLogout() {
  }
}

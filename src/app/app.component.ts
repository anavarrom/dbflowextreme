import { Component, OnInit } from '@angular/core';
import { OktaAuthService} from '@okta/okta-angular';
import { DbFlowAccount } from './core/models/account';
import { SessionService } from './core/state/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbflowextreme';
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService, public sessionService: SessionService ) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => {
        this.isAuthenticated = isAuthenticated;
        this.sessionService.loginSusccesfull();
      }
    );
  }
}

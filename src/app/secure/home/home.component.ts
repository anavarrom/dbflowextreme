import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { SessionService } from 'src/app/core/state/session/session.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;



  constructor(public sessionQuery: SessionQuery, public sessionService: SessionService, public toast: ToastService) {
  }

  async ngOnInit() {
  }

  logout() {
    this.sessionService.logout();
  }

  login() {
    this.sessionService.login();
  }

}

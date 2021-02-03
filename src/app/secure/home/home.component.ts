import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { SessionService } from 'src/app/core/state/session/session.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;

  profileSettings = [
    { value: 1, name: "Profile", icon: "user" },
    { value: 4, name: "Messages", icon: "email", badge: "5" },
    { value: 2, name: "Friends", icon: "group" },
    { value: 3, name: "Exit", icon: "runner" } ];

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

  onButtonClick(e) {
		this.toast.info("Go to " + e.component.option("text") + "'s profile");
	}

	onItemClick(e) {
		this.toast.info(e.itemData.name || e.itemData, 600);
	}

}

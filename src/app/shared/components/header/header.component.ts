import { dbFlowAuthService } from './../../../core/auth/auth.service';
import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { OktaAuthService } from '@okta/okta-angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SessionStore } from 'src/app/core/states/session.state';
import { RestTestService } from 'src/app/data/api/test.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Select(SessionStore.isLoggedIn) public isLoggedIn$: Observable<boolean>;


  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  userMenuItems = [{
    text: 'Profile',
    icon: 'user'
  }, {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logout();
    }
  }];

  loginItems = {
    text: 'Login',
    icon: 'runner',
    onClick: () => {
      this.authService.login();
    }
  };


  constructor(private authService: dbFlowAuthService) { }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }

import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SessionStore } from 'src/app/core/states/session.state';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  @Select(SessionStore.isLoggedIn) public isLoggedIn$: Observable<boolean>;

  constructor() {}
}

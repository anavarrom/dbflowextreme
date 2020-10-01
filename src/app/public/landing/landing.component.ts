import { SessionStore } from 'src/app/core/states/session.state';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @Select(SessionStore.isLoggedIn) public isLoggedIn$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

}

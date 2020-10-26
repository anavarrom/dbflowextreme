import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadSafeKeepingProjects } from 'src/app/core/actions/project.actions';
import { SessionStore } from 'src/app/core/states/session.state';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  @Select(SessionStore.isLoggedIn) public isLoggedIn$: Observable<boolean>;

  constructor(private store: Store,) {}

  ngOnInit() {
    this.store.dispatch(new LoadSafeKeepingProjects());
  }
}

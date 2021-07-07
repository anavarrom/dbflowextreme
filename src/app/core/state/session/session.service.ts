import { DbFlowError } from './../../models/error';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { tap } from 'rxjs/operators';
import { DbAccountConfiguration, DbFlowAccount } from '../../models/account';
import { ProjectsService } from '../projects/projects.service';
import { SessionStore } from './session.store';
import { ChatsService } from '../chats/chats.service';
import { RestTestService } from '../../../data/api/test.service';
import { GenericSearchService } from '../../..//data/api/search.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private http: HttpClient,
              public oktaAuth: OktaAuthService,
              public projectsService: ProjectsService,
              public chatsService: ChatsService,
              private genericSearchService: GenericSearchService, ) {
  }

  async loginSusccesfull() {

    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.sessionStore.update({ isAuthenticated: isAuthenticated });

    this.oktaAuth.getUser().then(value => {
      // const user:UserClaims = value;
      const account: DbFlowAccount = {
        username: value.preferred_username,
        firstName: value.given_name,
        lastName: value.given_name,
        enabled: true,
        email: value.preferred_username,
        authorities: [],
        imageUrl: ''
      };
      this.sessionStore.update({ userAccount: account });
      this.projectsService.initProjects(account);
      this.chatsService.init(account.username);
    });

    const config: DbAccountConfiguration = {
      myBackgroundColor: 'lightblue',
      otherBackgoundColor: 'lightcoral'
    };
    this.sessionStore.update({ userConfig: config });
  }

  logout() {
    this.sessionStore.update({ isAuthenticated: false });
    this.oktaAuth.signOut();
  }

  login() {
    this.oktaAuth.signInWithRedirect();
  }

  search() {
    this.genericSearchService.test().subscribe(
      // (notifs: INotification[]) => {
      (data: HttpResponse<any>) => {
        let data2 = JSON.stringify(data.body);
        this.sessionStore.update({ lastSearchResult: data.body });
      }, err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  registerLastError(error: DbFlowError) {
    this.sessionStore.update({ lastError: error });
  }
}

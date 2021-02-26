import { ChatsTabePageComponent } from './secure/chats/chats-tabe-page/chats-tabe-page.component';
import { ErrorPageComponent } from './secure/error/error-page.component';
import { ErrorHandlerInterceptor } from './core/interceptors/http.interceptor';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './secure/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { SafeKeepingDetailComponent } from './secure/calendars/safe-keeping-detail/safe-keeping-detail.component';
import { CalendarsTabePageComponent } from './secure/calendars/calendars-tabe-page/calendars-tabe-page.component';

const oktaConfig = {
  issuer: 'https://dev-811107.okta.com/oauth2/default',
  redirectUri: '/callback',
  clientId: '0oa12gdpqqgriw7474x7',
  scopes: ['openid', 'profile']
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [OktaAuthGuard],
    component: HomeComponent
  },
  {
    path: 'safeKeeping',
    component: SafeKeepingDetailComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'calendar',
    component: CalendarsTabePageComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'chats',
    component: ChatsTabePageComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  declarations: [
    // HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

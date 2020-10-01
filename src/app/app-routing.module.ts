import { LandingComponent } from './public/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { HomeComponent } from './secure/home/home.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { DisplayDataComponent } from './secure/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { ChatsTabePageComponent } from './secure/chats/chats-tabe-page/chats-tabe-page.component';
import { NotificationsTabPageComponent } from './secure/notifications/notifications-tab-page/notifications-tab-page.component';
import { CalendarsTabePageComponent } from './secure/calendars/calendars-tabe-page/calendars-tabe-page.component';
import { SafeKeepingDetailComponent } from './secure/calendars/safe-keeping-detail/safe-keeping-detail.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { CallbackComponent } from './callback.component';
import { OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';

const routes: Routes = [
  {
    path: 'callback',
    component: OktaCallbackComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'safeKeeping',
    component: SafeKeepingDetailComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'gotochat',
    component: ChatsTabePageComponent,
    canActivate: [OktaAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'notifications',
    component: NotificationsTabPageComponent,
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
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'landing',
    // canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

/*
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './secure/tabs/tabs.page';
import { NotificationsTabPageComponent } from './secure/notifications/notifications-tab-page/notifications-tab-page.component';
import { AppAuthGuard } from './shared/guards/AppAuthGuard';
import { CalendarsTabePageComponent } from './secure/calendars/calendars-tabe-page/calendars-tabe-page.component';
import { ChatsTabePageComponent } from './secure/chats/chats-tabe-page/chats-tabe-page.component';
import { NotificationDetailComponent } from './secure/notifications/notification-detail/notification-detail.component';
import { ChatDetailComponent } from './secure/chats/chat-detail/chat-detail.component';

// TODO: Corregir el redireccionamiento de rutas a algo dinámico
const routes: Routes = [
  {
    path: '', redirectTo: '/tabs/notifications', pathMatch: 'full'
  },
  {
   path: 'tabs',
   component: TabsPage,
   children: [
     {
       path: 'notifications',
       component: NotificationsTabPageComponent,
       canActivate: [AppAuthGuard],
       data: { roles: ['ROLE_USER'] }
     },
     {
      path: 'calendars',
      component: CalendarsTabePageComponent,
      canActivate: [AppAuthGuard],
      data: { roles: ['ROLE_USER'] }
    },
    {
      path: 'chats',
      component: ChatsTabePageComponent,
      canActivate: [AppAuthGuard],
      data: { roles: ['ROLE_USER'] }
    }
   ]
  },
  {
    path: 'NotificationDetail',
    component: NotificationDetailComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'ChatDetail',
    component: ChatDetailComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ROLE_USER'] }
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
*/

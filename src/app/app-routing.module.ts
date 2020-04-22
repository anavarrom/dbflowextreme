import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent]
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

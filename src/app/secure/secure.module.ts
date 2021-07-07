import { SharedModule } from './../shared/shared.module';
// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

// Custom modules
import { CoreModule } from '../core/core.module';
// Custom Components
// import { NotificationsTabPageComponent } from './notifications/notifications-tab-page/notifications-tab-page.component';
// import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';
// import { CalendarsTabePageComponent } from './calendars/calendars-tabe-page/calendars-tabe-page.component';
// import { ChatsTabePageComponent } from './chats/chats-tabe-page/chats-tabe-page.component';
import { ChatDetailComponent } from './chats/chat-detail/chat-detail.component';
// import { ProfileComponent } from './profile/profile.component';
// import { HomeComponent } from './home/home.component';
// import { DisplayDataComponent } from './display-data/display-data.component';
// import { SafeKeepingDetailComponent } from './calendars/safe-keeping-detail/safe-keeping-detail.component';

import { DxTileViewModule, DxToolbarModule, DxButtonModule, DxListModule, DxBoxModule,
         DxDrawerModule, DxResponsiveBoxModule, DxTemplateModule, DxSchedulerModule, DxTextBoxModule, DxContextMenuModule, DxDropDownButtonModule, DxScrollViewModule, DxPopupModule, DxFormComponent, DxFormModule, DxDateBoxModule, DxTextAreaModule, DxSpeedDialActionModule } from 'devextreme-angular';
import { HomeComponent } from './home/home.component';
import { OktaAuthGuard } from '@okta/okta-angular';
import { SafeKeepingDetailComponent } from './calendars/safe-keeping-detail/safe-keeping-detail.component';
import { CalendarsTabePageComponent } from './calendars/calendars-tabe-page/calendars-tabe-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ChatsTabePageComponent } from './chats/chats-tabe-page/chats-tabe-page.component';
import { NotificationsListComponent } from './notifications/notifications-list/notifications-list.component';
import { NotificationCardListComponent } from './notifications/notification-card-list/notification-card-list.component';
import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';
import { GenericSearchComponent } from './search/generic-search/generic-search.component';
// import { ErrorPageComponent } from './error/error.component';
// import { SharedModule } from '../shared/shared.module';

const devExtremeModule = [
  DxTemplateModule,
  DxTileViewModule,
  DxButtonModule,
  DxDateBoxModule,
  DxListModule,
  DxBoxModule,
  DxResponsiveBoxModule,
  DxToolbarModule,
  DxSchedulerModule,
  DxDrawerModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxContextMenuModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
  DxPopupModule,
  DxFormModule,
  DxSpeedDialActionModule
];

const externalModules = [
  CommonModule,
  FormsModule,
  RouterModule,
  devExtremeModule,
  MomentModule,
  NgxJsonViewerModule
  // OnsenModule
];

const dbFlow6Components = [
  HomeComponent,
  SafeKeepingDetailComponent,
  CalendarsTabePageComponent,
  ErrorPageComponent,
  NotificationsListComponent,
  NotificationCardListComponent,
  // NotificationsTabPageComponent,
  NotificationDetailComponent,
  ChatsTabePageComponent,
  ChatDetailComponent,
  GenericSearchComponent,
  // DisplayDataComponent,
  // ProfileComponent,
];
/*
const routes: Routes = [
  {
    path: 'home',
    canActivate: [OktaAuthGuard],
    component: HomeComponent
  }
];*/

@NgModule({
  imports: [
    externalModules,
    CoreModule,
    SharedModule,
   // RouterModule.forRoot(routes)
  ],
  entryComponents: [
    dbFlow6Components
  ],
  declarations: [
    dbFlow6Components,
    NotificationsListComponent,
    // SafeKeepingDetailComponent,
  ],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [],
  exports: [/*SecureComponent*/],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SecureModule { }

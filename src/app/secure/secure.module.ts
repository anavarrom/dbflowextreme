// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MomentModule } from 'ngx-moment';


// Custom modules
import { CoreModule } from '../core/core.module';
// Custom Components
// import { NotificationsTabPageComponent } from './notifications/notifications-tab-page/notifications-tab-page.component';
// import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';
// import { CalendarsTabePageComponent } from './calendars/calendars-tabe-page/calendars-tabe-page.component';
// import { ChatsTabePageComponent } from './chats/chats-tabe-page/chats-tabe-page.component';
// import { ChatDetailComponent } from './chats/chat-detail/chat-detail.component';
// import { ProfileComponent } from './profile/profile.component';
// import { HomeComponent } from './home/home.component';
// import { DisplayDataComponent } from './display-data/display-data.component';
// import { SafeKeepingDetailComponent } from './calendars/safe-keeping-detail/safe-keeping-detail.component';

import { DxTileViewModule, DxToolbarModule, DxButtonModule, DxListModule, DxBoxModule,
         DxDrawerModule, DxResponsiveBoxModule, DxTemplateModule, DxSchedulerModule, DxTextBoxModule, DxContextMenuModule } from 'devextreme-angular';
// import { SharedModule } from '../shared/shared.module';

const devExtremeModule = [
  DxTemplateModule,
  DxTileViewModule,
  DxButtonModule,
  DxListModule,
  DxBoxModule,
  DxResponsiveBoxModule,
  DxToolbarModule,
  DxSchedulerModule,
  DxDrawerModule,
  DxTextBoxModule,
  DxContextMenuModule
];

const externalModules = [
  CommonModule,
  FormsModule,
  RouterModule,
  devExtremeModule
  //MomentModule
  // OnsenModule
];

const dbFlow6Components = [
  // MainComponent,
  // NotificationsTabPageComponent,
  // NotificationDetailComponent,
  // CalendarsTabePageComponent,
  // ChatsTabePageComponent,
  // ChatDetailComponent,
  // DisplayDataComponent,
  // HomeComponent,
  // ProfileComponent,
  // SafeKeepingDetailComponent
];


@NgModule({
  imports: [
    externalModules,
    CoreModule,
  ],
  entryComponents: [
    dbFlow6Components
  ],
  declarations: [
    dbFlow6Components,
    // SafeKeepingDetailComponent,
  ],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [],
  exports: [/*SecureComponent*/],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SecureModule { }

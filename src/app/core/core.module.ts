// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

// Custom modules
// Custom Components
import { NotificationStore } from './states/notification.state';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakBearerInterceptor } from 'keycloak-angular';
import { ChatStore } from './states/chat.state';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompService, StompConfig } from '@stomp/ng2-stompjs';

// Project Services
import { NotificactionService           } from '../data/api/notification.service';
import { ChatService } from '../data/api/chat.service';
import { MessageService } from '../data/api/message.service';
import { SessionStore } from './states/session.state';
import { AppointmentService } from '../data/api/appointment.service';
import { AppointmentStore } from './states/appointment.state';
import { SharedModule } from '../shared/shared.module';

const dbFlow6Stores = [
  NotificationStore,
  ChatStore,
  SessionStore,
  AppointmentStore
];

const externalModules = [
  CommonModule,
  SharedModule,
  NgxsModule.forRoot( dbFlow6Stores, { developmentMode: !environment.production }),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
  NgxsRouterPluginModule.forRoot(),
];


const dbFlow6Services = [
    NotificactionService,
    ChatService,
    MessageService,
    AppointmentService
];


@NgModule({
  imports: [
    externalModules
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers:  [
    dbFlow6Stores,
    dbFlow6Services,
    StompService,
    {
      provide: StompConfig,
      useValue: environment.stompConfig
    }/*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: environment.rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }*/
  ],
  exports: [
  ],

})
export class CoreModule { }

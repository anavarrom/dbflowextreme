import { RestTestService } from './../data/api/test.service';
// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';

// Custom modules
// Custom Components
import { environment } from 'src/environments/environment';
// import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompService, StompConfig } from '@stomp/ng2-stompjs';

// Project Services
import { NotificactionService           } from '../data/api/notification.service';
import { ChatService } from '../data/api/chat.service';
import { MessageService } from '../data/api/message.service';
import { AppointmentService } from '../data/api/appointment.service';
import { SafeKeepingPeriodService } from '../data/api/safekeepingperiod.service';
import { SafeKeepingProjectService } from '../data/api/safekeepingproject.service';

const dbFlow6Stores = [
];

const externalModules = [
  CommonModule,
  // SharedModule,
];


const dbFlow6Services = [
    NotificactionService,
    ChatService,
    MessageService,
    AppointmentService,
    SafeKeepingPeriodService,
    SafeKeepingProjectService,
    RestTestService
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
    /*StompService,
    {
      provide: StompConfig,
      useValue: environment.stompConfig
    }
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

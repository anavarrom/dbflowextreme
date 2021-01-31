import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './shared/layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { Configuration, ConfigurationParameters } from './data/configuration';
import { environment } from 'src/environments/environment';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/errorhandler.interceptor';
import { CallbackComponent } from './callback.component';
import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { RestTestService } from './data/api/test.service';

/*export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init();
}*/

// DoBootstrap
const oktaConfig = {
  issuer: 'https://dev-811107.okta.com/oauth2/default',
  clientId: '0oa12gdpqqgriw7474x7',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
  pkce: true
}


export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    basePath: environment.basePath,
    username: 'patttsa'
  };

  return new Configuration(params);
}

const dbFlow6Components = [
  CallbackComponent,
 // PublicComponent
];

const externalModules = [
  OktaAuthModule
  // KeycloakAngularModule
  // AppRoutingModule,
  // ReactiveFormsModule,
  // Ng2UiAuthModule,
  // MobxAngularModule
];
const customModules = [
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
  FooterModule,
  LoginFormModule,
  AppRoutingModule,
  SecureModule,
  PublicModule,
  SharedModule,
  DataModule.forRoot(apiConfigFactory)
];


@NgModule({

  declarations: [
    AppComponent,
    dbFlow6Components
  ],
  entryComponents: [
    AppComponent,
    dbFlow6Components
  ],
  imports: [
    BrowserModule,
    externalModules,
    customModules
  ],

  providers: [
    ScreenService,
    AppInfoService,
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    // { provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [KeycloakService] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }/*,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

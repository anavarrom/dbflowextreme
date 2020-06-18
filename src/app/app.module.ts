import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './shared/layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakService, CoreModule, KeycloakAngularModule } from 'keycloak-angular';
import { Configuration, ConfigurationParameters } from './data/configuration';
import { environment } from 'src/environments/environment';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { AppAuthGuard } from './shared/guards/AppAuthGuard';
import { initializer } from './shared/guards/app-init';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/errorhandler.interceptor';


/*export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init();
}*/

// DoBootstrap

const keycloakService = new KeycloakService();


export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    basePath: environment.basePath,
    username: 'patttsa'
  };

  return new Configuration(params);
}

const dbFlow6Components = [
 // LoginComponent,
 // PublicComponent
];

const externalModules = [
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
  CoreModule,
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
    KeycloakAngularModule,
    BrowserModule,
    externalModules,
    customModules
  ],

  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    AppAuthGuard,
    { provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [KeycloakService] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

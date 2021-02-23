import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { environment } from '../environments/environment';
import { Configuration, ConfigurationParameters } from './data/configuration';
import { SecureModule } from './secure/secure.module';
import { DataModule } from './data/data.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationEffects } from './core/effects/navigation.effect';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/http.interceptor';
import { SessionEffects } from './core/effects/session.effect';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    basePath: environment.basePath,
    username: 'patttsa'
  };

  return new Configuration(params);
}

const dbFlow6Components = [
];

const externalModules = [
  AppRoutingModule,
  AuthRoutingModule,
  environment.production ? [] : AkitaNgDevtools.forRoot(),
  AkitaNgRouterStoreModule,
  AkitaNgEffectsModule.forRoot([NavigationEffects, SessionEffects]),
  FontAwesomeModule
];


const customModules = [
  SecureModule,
  SharedModule,
  DataModule.forRoot(apiConfigFactory)
];

@NgModule({
  declarations: [
    AppComponent,
    dbFlow6Components
  ],
  imports: [
    BrowserModule,
    externalModules,
    customModules,
  ],
  providers: [
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

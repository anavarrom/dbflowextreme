import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { Configuration, ConfigurationParameters } from './data/configuration';
import { SecureModule } from './secure/secure.module';
import { DataModule } from './data/data.module';

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
    customModules
  ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }

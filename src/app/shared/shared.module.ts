import { RouterModule } from '@angular/router';
// External modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastService } from './services/toast.service';
import { HeaderComponent } from './components/header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { DxTemplateModule, DxButtonModule, DxListModule, DxToolbarModule, DxTextBoxModule, DxCheckBoxModule, DxMenuModule } from 'devextreme-angular';
// import { ErrorComponent } from './components/error/error.component';
// Custom modules
// Custom Components
// import {ErrorDetailComponent} from './error-detail/error-detail.component';
const dbFlow6Components = [
  HeaderComponent
  // ChatViewComponent
];

const dbFlow6Services = [
  ToastService
];

const devExtremeModule = [
  DxTemplateModule, DxButtonModule, DxListModule, DxToolbarModule, DxTextBoxModule, DxMenuModule, DxCheckBoxModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    devExtremeModule
  ],
  declarations: [
    dbFlow6Components
    //ErrorComponent,
    //  ErrorDetailComponent
  ],
  providers: [
    dbFlow6Services
  ],

  entryComponents: [
    dbFlow6Components

   // ErrorDetailComponent
  ],
  exports: [
    dbFlow6Components
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
 })
export class SharedModule { }

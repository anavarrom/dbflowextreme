// External modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard } from './guards/AppAuthGuard';
import { ToastService } from './services/toast.service';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { DxTemplateModule, DxButtonModule, DxListModule, DxToolbarModule, DxTextBoxModule } from 'devextreme-angular';
import { ErrorComponent } from './components/error/error.component';

// Custom modules
// Custom Components
// import {ErrorDetailComponent} from './error-detail/error-detail.component';
const dbFlow6Components = [
  ChatViewComponent
];

const dbFlow6Services = [
  ToastService
];

const devExtremeModule = [
  DxTemplateModule,
  DxButtonModule,
  DxListModule,
  DxToolbarModule,
  DxTextBoxModule,
];

@NgModule({
  imports: [
    CommonModule,
    devExtremeModule
  ],
  declarations: [
    dbFlow6Components,
    ErrorComponent,
    

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
 })
export class SharedModule { }

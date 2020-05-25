// External modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard } from './guards/AppAuthGuard';
import { ToastService } from './services/toast.service';

// Custom modules
// Custom Components
// import {ErrorDetailComponent} from './error-detail/error-detail.component';
const dbFlow6Components = [
  
];

const dbFlow6Services = [
  ToastService
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    dbFlow6Components

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
   ],
 })
export class SharedModule { }

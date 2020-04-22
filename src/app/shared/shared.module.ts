// External modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard } from './guards/AppAuthGuard';

// Custom modules
// Custom Components
// import {ErrorDetailComponent} from './error-detail/error-detail.component';
const dbFlow6Components = [
  
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    dbFlow6Components

    //  ErrorDetailComponent
  ],
  entryComponents: [
    dbFlow6Components

   // ErrorDetailComponent
  ],
  exports: [
   ],
 })
export class SharedModule { }

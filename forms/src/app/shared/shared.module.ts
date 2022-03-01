import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';



@NgModule({
  declarations: [FormDebugComponent],
  exports: [FormDebugComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

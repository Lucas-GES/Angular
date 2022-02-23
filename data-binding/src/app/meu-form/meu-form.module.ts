import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuFormComponent } from './meu-form.component';
import { DataBindingComponent } from '../data-binding/data-binding.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MeuFormComponent,
    DataBindingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MeuFormComponent
  ]
})
export class MeuFormModule { }

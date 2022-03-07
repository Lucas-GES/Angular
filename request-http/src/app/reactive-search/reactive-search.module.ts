import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveSearchRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveSearchModule { }

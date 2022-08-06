import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directivas/sortable.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    RecuperarContrasenaComponent,
    NgbdSortableHeader,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbdSortableHeader
  
  ],
  providers:[
    // NgbdSortableHeader
  ]
  
})
export class SharedModule { }

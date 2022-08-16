import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directivas/sortable.directive';
import { BrowserModule } from '@angular/platform-browser';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    RecuperarContrasenaComponent,
    NgbdSortableHeader,
    StepperComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CdkStepperModule

    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbdSortableHeader,
    StepperComponent,
    CdkStepperModule
  ],
  providers:[
    // NgbdSortableHeader
  ]
  
})
export class SharedModule { }

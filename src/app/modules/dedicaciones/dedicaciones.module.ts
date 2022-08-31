import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DedicacionesRoutingModule } from './dedicaciones-routing.module';
import { FDedicacionComponent } from './components/f-dedicacion/f-dedicacion.component';
import { CartaInicioComponent } from './components/carta-inicio/carta-inicio.component';

import { AmazingTimePickerModule } from 'amazing-time-picker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PlanTrabajoComponent } from './components/plan-trabajo/plan-trabajo.component';
import { CrearDedicacionComponent } from './pages/crear-dedicacion/crear-dedicacion.component';
import { EditarDedicacionComponent } from './pages/editar-dedicacion/editar-dedicacion.component';
import { VerDedicacionComponent } from './pages/ver-dedicacion/ver-dedicacion.component';
import { SharedModule } from '@shared/shared.module';
import { PlanDesarrolloInstitucionalComponent } from './components/plan-desarrollo-institucional/plan-desarrollo-institucional.component';

@NgModule({
  declarations: [
    FDedicacionComponent,
    CartaInicioComponent,
    PlanTrabajoComponent,
    CrearDedicacionComponent,
    EditarDedicacionComponent,
    VerDedicacionComponent,
    PlanDesarrolloInstitucionalComponent
  ],
  imports: [
    CommonModule,
    DedicacionesRoutingModule,
    FormsModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SharedModule
  ]
})
export class DedicacionesModule { }

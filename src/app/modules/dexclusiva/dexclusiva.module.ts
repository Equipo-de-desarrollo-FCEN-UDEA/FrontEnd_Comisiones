import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DexclusivaRoutingModule } from './dexclusiva-routing.module';
import { FDedicacionComponent } from './components/f-dedicacion/f-dedicacion.component';
import { CartaInicioComponent } from './components/carta-inicio/carta-inicio.component';

import { AmazingTimePickerModule } from 'amazing-time-picker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PlanTrabajoComponent } from './components/plan-trabajo/plan-trabajo.component';
import { CrearDedicacionComponent } from './pages/crear-dedicacion/crear-dedicacion.component';
import { EditarDedicacionComponent } from './pages/editar-dedicacion/editar-dedicacion.component';
import { VerDedicacionComponent } from './pages/ver-dedicacion/ver-dedicacion.component';

@NgModule({
  declarations: [
    FDedicacionComponent,
    CartaInicioComponent,
    PlanTrabajoComponent,
    CrearDedicacionComponent,
    EditarDedicacionComponent,
    VerDedicacionComponent
  ],
  imports: [
    CommonModule,
    DexclusivaRoutingModule,
    FormsModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class DexclusivaModule { }

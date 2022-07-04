import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';


@NgModule({
  declarations: [
    VerComisionComponent,
    CrearComisionComponent
  ],
  imports: [
    CommonModule,
    ComisionesRoutingModule
  ]
})
export class ComisionesModule { }

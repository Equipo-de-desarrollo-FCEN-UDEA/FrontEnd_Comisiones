import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    VerComisionComponent,
    CrearComisionComponent
  ],
  imports: [
    CommonModule,
    ComisionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ]
})
export class ComisionesModule { }

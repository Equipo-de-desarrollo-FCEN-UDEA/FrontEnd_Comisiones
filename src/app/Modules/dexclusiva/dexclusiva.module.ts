import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DexclusivaRoutingModule } from './dexclusiva-routing.module';
import { FDedicacionComponent } from './pages/f-dedicacion/f-dedicacion.component';
import { CartaInicioComponent } from './pages/carta-inicio/carta-inicio.component';


@NgModule({
  declarations: [
    FDedicacionComponent,
    CartaInicioComponent
  ],
  imports: [
    CommonModule,
    DexclusivaRoutingModule
  ]
})
export class DexclusivaModule { }

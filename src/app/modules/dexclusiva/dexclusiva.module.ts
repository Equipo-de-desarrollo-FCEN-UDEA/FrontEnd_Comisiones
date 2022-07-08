import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DexclusivaRoutingModule } from './dexclusiva-routing.module';
import { FDedicacionComponent } from './pages/f-dedicacion/f-dedicacion.component';
import { CartaInicioComponent } from './pages/carta-inicio/carta-inicio.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    FDedicacionComponent,
    CartaInicioComponent
  ],
  imports: [
    CommonModule,
    DexclusivaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class DexclusivaModule { }

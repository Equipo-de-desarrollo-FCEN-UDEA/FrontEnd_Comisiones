import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';


@NgModule({
  declarations: [
  
    TablaSolicitudesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

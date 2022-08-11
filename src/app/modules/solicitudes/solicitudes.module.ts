import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesComponent } from './solicitudes.component';
import { BuscarPermisoComponent } from './components/buscar-permiso/buscar-permiso.component';
import { BuscarComisionComponent } from './components/buscar-comision/buscar-comision.component';
import { BuscarDexclusivaComponent } from './components/buscar-dexclusiva/buscar-dexclusiva.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { SharedModule } from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SolicitudesComponent,
    BuscarPermisoComponent,
    BuscarComisionComponent,
    BuscarDexclusivaComponent,
    MenuLateralComponent,

  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class SolicitudesModule { }

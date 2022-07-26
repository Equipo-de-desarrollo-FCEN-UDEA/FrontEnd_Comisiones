import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';
import { BuscarComisionComponent } from './pages/buscar-comision/buscar-comision.component';
import { BuscarPermisoComponent } from './pages/buscar-permiso/buscar-permiso.component';
import { BuscarDexclusivaComponent } from './pages/buscar-dexclusiva/buscar-dexclusiva.component';
import { HomeRoutingModule } from './solicitudes-routing.module';



@NgModule({
  declarations: [
    TablaSolicitudesComponent,
    BuscarComisionComponent,
    BuscarPermisoComponent,
    BuscarDexclusivaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class SolicitudesModule { }

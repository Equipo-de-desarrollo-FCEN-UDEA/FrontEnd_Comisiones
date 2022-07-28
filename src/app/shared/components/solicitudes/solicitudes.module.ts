import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';
import { BuscarComisionComponent } from './pages/buscar-comision/buscar-comision.component';
import { BuscarPermisoComponent } from './pages/buscar-permiso/buscar-permiso.component';
import { BuscarDexclusivaComponent } from './pages/buscar-dexclusiva/buscar-dexclusiva.component';
import { HomeRoutingModule } from './solicitudes-routing.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroComisionPipe } from './pipes/filtro-comision.pipe';
import { FiltroPermisoPipe } from './pipes/filtro-permiso.pipe';
import { FiltroDexclusivaPipe } from './pipes/filtro-dexclusiva.pipe';



@NgModule({
  declarations: [
    TablaSolicitudesComponent,
    BuscarComisionComponent,
    BuscarPermisoComponent,
    BuscarDexclusivaComponent,
    FiltroPipe,
    FiltroComisionPipe,
    FiltroPermisoPipe,
    FiltroDexclusivaPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class SolicitudesModule { }

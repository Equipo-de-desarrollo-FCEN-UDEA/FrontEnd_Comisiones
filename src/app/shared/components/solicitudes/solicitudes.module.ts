import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';
import { BuscarComisionComponent } from './pages/buscar-comision/buscar-comision.component';
import { BuscarPermisoComponent } from './pages/buscar-permiso/buscar-permiso.component';
import { BuscarDexclusivaComponent } from './pages/buscar-dexclusiva/buscar-dexclusiva.component';
import { HomeRoutingModule } from './solicitudes-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '@shared/directivas/sortable.directive';
import { SharedModule } from '@shared/shared.module';
// import { NgbdSortablePermiso } from '@shared/directivas/sortable-permiso.directive';



@NgModule({
  declarations: [
    TablaSolicitudesComponent,
    BuscarComisionComponent,
    BuscarPermisoComponent,
    BuscarDexclusivaComponent,
    
    // NgbdSortablePermiso

   
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    NgbModule
    
  ],
  providers:[
    NgbdSortableHeader
  ]

})
export class SolicitudesModule { }

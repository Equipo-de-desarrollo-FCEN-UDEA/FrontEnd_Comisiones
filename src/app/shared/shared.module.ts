import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSolicitudesComponent } from './components/tablas/tabla-solicitudes/tabla-solicitudes.component';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directivas/sortable.directive';
import { BuscarComisionComponent } from './components/tablas/pages/buscar-comision/buscar-comision.component';
import { BuscarPermisoComponent } from './components/tablas/pages/buscar-permiso/buscar-permiso.component';
import { BuscarDexclusivaComponent } from './components/tablas/pages/buscar-dexclusiva/buscar-dexclusiva.component';
import { SolicitudesTablaComponent } from './components/tablas/solicitudes-tabla/solicitudes-tabla.component';

@NgModule({
  declarations: [
    // TablaSolicitudesComponent,
    SolicitudesTablaComponent,
    RecuperarContrasenaComponent,
    NgbdSortableHeader,
    BuscarComisionComponent,
    BuscarPermisoComponent,
    BuscarDexclusivaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  exports: [
    // TablaSolicitudesComponent,
    SolicitudesTablaComponent
  ],
  bootstrap:[SolicitudesTablaComponent]
})
export class SharedModule { }

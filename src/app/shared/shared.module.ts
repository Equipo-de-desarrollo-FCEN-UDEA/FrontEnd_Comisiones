import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSolicitudesComponent } from './components/tablas/tabla-solicitudes/tabla-solicitudes.component';
import { TablaComisionesComponent } from './components/tablas/tabla-comisiones/tabla-comisiones.component';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directivas/sortable.directive';




@NgModule({
  declarations: [
    TablaSolicitudesComponent,
    TablaComisionesComponent,
    RecuperarContrasenaComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  exports: [
    TablaSolicitudesComponent,
    TablaComisionesComponent
  ],
  bootstrap:[TablaSolicitudesComponent]
})
export class SharedModule { }

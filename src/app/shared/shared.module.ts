import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSolicitudesComponent } from './components/tablas/tabla-solicitudes/tabla-solicitudes.component';
import { TablaComisionesComponent } from './components/tablas/tabla-comisiones/tabla-comisiones.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';



@NgModule({
  declarations: [
    TablaSolicitudesComponent,
    TablaComisionesComponent,
    RecuperarContrasenaComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TablaSolicitudesComponent,
    TablaComisionesComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { VerPermisoComponent } from './pages/ver-permiso/ver-permiso.component';
import { CrearPermisoComponent } from './pages/crear-permiso/crear-permiso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
  
    VerPermisoComponent,
    CrearPermisoComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PermisosModule { }


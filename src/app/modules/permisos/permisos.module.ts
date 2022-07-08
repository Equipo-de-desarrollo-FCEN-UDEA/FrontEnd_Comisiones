import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearPermisoComponent } from './pages/crear-permiso/crear-permiso.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
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


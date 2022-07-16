import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { pathToFileURL } from 'url';
import { VerPermisoComponent } from './pages/ver-permiso/ver-permiso.component';

const routes: Routes = [
  {
    path: 'ver-permisos/:id',
    component: VerPermisoComponent
  }

import { CrearPermisoComponent } from './pages/crear-permiso/crear-permiso.component';

const routes: Routes = [

  {
    path: 'crear-permiso',
    component: CrearPermisoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }



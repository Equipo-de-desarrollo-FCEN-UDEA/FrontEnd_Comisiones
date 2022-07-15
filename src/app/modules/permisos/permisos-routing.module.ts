import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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



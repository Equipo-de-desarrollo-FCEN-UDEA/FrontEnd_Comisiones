import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
// import { VerPermisoComponent } from './pages/ver-permiso/ver-permiso.component';

const routes: Routes = [
  {
    // path: 'ver-permisos',
    // component: VerPermisoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }

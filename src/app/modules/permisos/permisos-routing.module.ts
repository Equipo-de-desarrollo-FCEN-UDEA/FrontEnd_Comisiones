import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { pathToFileURL } from 'url';
import { VerPermisoComponent } from './pages/ver-permiso/ver-permiso.component';
import { CrearPermisoComponent } from './pages/crear-permiso/crear-permiso.component';
import { EditarPermisoComponent } from './pages/editar-permiso/editar-permiso.component';
import { EstadosPermisoComponent } from './pages/ver-permiso/estados-permiso/estados-permiso.component';
import { RolGuard } from '@guards/rol.guard';
import { RoladminGuard } from '@guards/roladmin.guard';

const routes: Routes = [
  {
    path: 'ver-permiso/:id',
    component: VerPermisoComponent
  },

  {
    path: 'crear-permiso',
    canActivate: [RoladminGuard],
    component: CrearPermisoComponent,
  },

  {
    path: 'editar-permiso/:id',
    canActivate: [RoladminGuard],
    component: EditarPermisoComponent
  },

  {
    path: 'asociar-estado/:id',
    component: EstadosPermisoComponent
  },
  { 
    path: '**', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: '', 
    redirectTo: '/404', 
    pathMatch: 'full' 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }



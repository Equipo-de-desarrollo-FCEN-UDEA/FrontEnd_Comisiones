import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '@guards/rol.guard';
import { RoladminGuard } from '@guards/roladmin.guard';
import { CrearDedicacionComponent } from './pages/crear-dedicacion/crear-dedicacion.component';
import { EditarDedicacionComponent } from './pages/editar-dedicacion/editar-dedicacion.component';
import { EstadosDedicacionComponent } from './pages/estados/estados.component';
import { VerDedicacionComponent } from './pages/ver-dedicacion/ver-dedicacion.component';

const routes: Routes = [

  {
    path: 'crear-dedicacion',
    canActivate: [RoladminGuard],
    component: CrearDedicacionComponent
  },
  {
    path: 'editar-dedicacion/:id',
    canActivate: [RoladminGuard],
    component: EditarDedicacionComponent
  },
  {
    path: 'ver-dedicacion/:id',
    component: VerDedicacionComponent
  },
  {
    path: 'asociar-estado/:id',
    component: EstadosDedicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DedicacionesRoutingModule { }

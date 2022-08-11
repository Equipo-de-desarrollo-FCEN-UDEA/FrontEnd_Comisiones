import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDedicacionComponent } from './pages/crear-dedicacion/crear-dedicacion.component';

const routes: Routes = [

  {
    path: 'crear-dedicacion',
    component: CrearDedicacionComponent
  },
  {
    path: 'editar-dedicacion/:id',
    component: CrearDedicacionComponent
  },
  {
    path: 'ver-dedicacion/:id',
    component: CrearDedicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DexclusivaRoutingModule { }

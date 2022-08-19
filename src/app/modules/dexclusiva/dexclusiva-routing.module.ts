import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDedicacionComponent } from './pages/crear-dedicacion/crear-dedicacion.component';
import { EditarDedicacionComponent } from './pages/editar-dedicacion/editar-dedicacion.component';
import { VerDedicacionComponent } from './pages/ver-dedicacion/ver-dedicacion.component';

const routes: Routes = [

  {
    path: 'crear-dedicacion',
    component: CrearDedicacionComponent
  },
  {
    path: 'editar-dedicacion/:id',
    component: EditarDedicacionComponent
  },
  {
    path: 'ver-dedicacion/:id',
    component: VerDedicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DexclusivaRoutingModule { }

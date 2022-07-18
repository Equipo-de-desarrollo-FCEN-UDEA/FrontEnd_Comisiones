import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaInicioComponent } from './pages/carta-inicio/carta-inicio.component';
import { FDedicacionComponent } from './pages/f-dedicacion/f-dedicacion.component';
import { PlanTrabajoComponent } from './pages/plan-trabajo/plan-trabajo.component';

const routes: Routes = [
  {
    path:'formulario-dedicacion',
    component: FDedicacionComponent
  },

  {
    path: 'carta-inicio',
    component: CartaInicioComponent
  },
  {
    path: 'plan-trabajo',
    component: PlanTrabajoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DexclusivaRoutingModule { }

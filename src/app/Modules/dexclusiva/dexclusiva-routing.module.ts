import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaInicioComponent } from './pages/carta-inicio/carta-inicio.component';
import { FDedicacionComponent } from './pages/f-dedicacion/f-dedicacion.component';

const routes: Routes = [
  {path:'formulario-dedicacion',
  component: FDedicacionComponent
},
{
  path: 'carta-inicio',
  component: CartaInicioComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DexclusivaRoutingModule { }

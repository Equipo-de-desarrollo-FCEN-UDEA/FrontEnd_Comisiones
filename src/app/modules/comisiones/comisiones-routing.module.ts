import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';
import { EditarComisionComponent } from './pages/editar-comision/editar-comision.component';
import { EstadosComisionComponent } from './pages/ver-comision/estados/estados-comision/estados-comision.component';
import { CumplidoComponent } from './pages/ver-comision/cumplido/cumplido.component';


const routes: Routes = [

  {
    path: 'crear-comision',
    component: CrearComisionComponent
  },

  {
    path: 'ver-comision/:id',
    component: VerComisionComponent,

  },

  {
    path: 'editar-comision/:id',
    component: EditarComisionComponent
  },

  {
  path: 'asociar-estado/:id',
  component: EstadosComisionComponent
  },

  {
  path: 'subir-cumplido/:id',
  component: CumplidoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule { }

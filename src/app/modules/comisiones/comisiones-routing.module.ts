import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';
import { EditarComisionComponent } from './pages/editar-comision/editar-comision.component';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';


const routes: Routes = [

{
    path: 'crear-comision',
    component: CrearComisionComponent
},

{
    path: 'ver-comision',
    component: VerComisionComponent
},
{
    path: 'editar-comision', 
    component: EditarComisionComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule { }

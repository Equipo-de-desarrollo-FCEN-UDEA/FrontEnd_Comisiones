import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';
import { EditarComisionComponent } from './pages/editar-comision/editar-comision.component';
import { EstadosComisionComponent } from './pages/ver-comision/estados/estados-comision/estados-comision.component';
import { CumplidoComponent } from './pages/ver-comision/cumplidos/crear-cumplido/crear-cumplido.component';
import { RolGuard } from '@guards/rol.guard';
import { RoladminGuard } from '@guards/roladmin.guard';


const routes: Routes = [

{
    path: 'crear-comision',
    canActivate: [RoladminGuard],
    component: CrearComisionComponent
  },

  {
    path: 'ver-comision/:id',
    component: VerComisionComponent,

  },

  {
    path: 'editar-comision/:id',
    canActivate: [RoladminGuard],
    component: EditarComisionComponent
  },
  
  {
    path: 'asociar-estado/:id',
    component: EstadosComisionComponent
  },
  {
    path: 'subir-cumplido/:id',
    canActivate: [RoladminGuard],
    component: CumplidoComponent
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
export class ComisionesRoutingModule { }

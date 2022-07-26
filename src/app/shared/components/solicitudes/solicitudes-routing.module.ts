import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComisionComponent } from './pages/buscar-comision/buscar-comision.component';
import { BuscarDexclusivaComponent } from './pages/buscar-dexclusiva/buscar-dexclusiva.component';
import { BuscarPermisoComponent } from './pages/buscar-permiso/buscar-permiso.component';
import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';

const routes: Routes = [
  { 
    path: '',
    component: TablaSolicitudesComponent,
    children:[
      {
        path:'comision',
        component: BuscarComisionComponent
      },
      {
    path: 'permiso',
    component: BuscarPermisoComponent
  },
  {
    path: 'dexclusiva',
    component: BuscarDexclusivaComponent
  }
    ]
    
  },

  // {
  //   path: 'comision',
  //   component: BuscarComisionComponent
  // },

  // {
  //   path: 'permiso',
  //   component: BuscarPermisoComponent
  // },

  // {
  //   path: 'dexclusiva',
  //   component: BuscarDexclusivaComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

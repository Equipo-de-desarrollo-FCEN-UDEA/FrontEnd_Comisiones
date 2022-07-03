import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'dexclusiva'
    ,loadChildren: () => import ('./Modules/dexclusiva/dexclusiva.module')
    .then(m => m.DexclusivaModule) 
  }, 
  
  { 
    path: 'comisiones'
    ,loadChildren: () => import('./Modules/comisiones/comisiones.module')
    .then(m => m.ComisionesModule) 
  }, 
    
  { 
    path: 'home'
    ,loadChildren: () => import('./Modules/home/home.module')
    .then(m => m.HomeModule) 
  }, 
    
  { 
    path: 'permisos'
    ,loadChildren: () => import('./Modules/permisos/permisos.module')
    .then(m => m.PermisosModule) 
  },

  {
    path: '**',
    redirectTo: 'home' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

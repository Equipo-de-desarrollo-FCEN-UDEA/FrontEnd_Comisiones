import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { LoginComponent } from '@shared/pages/login/login.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { NotFoundError } from 'rxjs';

const routes: Routes = [
  {
    path: 'dexclusiva',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Modules/dexclusiva/dexclusiva.module')
      .then(m => m.DexclusivaModule)
  },
  {
    path: 'comisiones',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Modules/comisiones/comisiones.module')
      .then(m => m.ComisionesModule)
  },
  {
    path: 'home' || '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Modules/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'permisos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Modules/permisos/permisos.module')
      .then(m => m.PermisosModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

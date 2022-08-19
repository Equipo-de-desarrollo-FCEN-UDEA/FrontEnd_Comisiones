import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { LoginComponent } from '@shared/pages/login/login.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { RecuperarContrasenaComponent } from '@shared/pages/recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
  {
    path: 'dexclusiva',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dexclusiva/dexclusiva.module')
      .then(m => m.DexclusivaModule)
  },
  {
    path: 'comisiones',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/comisiones/comisiones.module')
      .then(m => m.ComisionesModule)
  },
  {
    path: 'permisos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/permisos/permisos.module')
      .then(m => m.PermisosModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenaComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/solicitudes/solicitudes.module')
    .then(m=>m.SolicitudesModule)
  },
  { 
    path: 'usuarios',
    canActivate: [AuthGuard], 
   loadChildren: () => import('./modules/usuarios/usuarios.module')
   .then(m => m.UsuariosModule) 
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

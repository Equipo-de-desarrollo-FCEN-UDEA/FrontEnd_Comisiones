import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '@guards/rol.guard';
import { EditarContrasenaComponent } from './pages/editar-contrasena/editar-contrasena.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';


const routes: Routes = [
  {
    path: 'lista-usuarios',
    canActivate: [RolGuard],
    component: ListaUsuariosComponent
  },
  {
    path: 'ver-usuario/:id',
    component: VerUsuarioComponent
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'editar-contrasena/:id',
    component: EditarContrasenaComponent
  },
  {
    path: 'registrar-usuarios',
    canActivate: [RolGuard],
    component: RegistrarUsuariosComponent
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
export class UsuariosRoutingModule { }

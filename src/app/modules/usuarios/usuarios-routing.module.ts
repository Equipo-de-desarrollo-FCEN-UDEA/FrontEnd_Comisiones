import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@guards/admin.guard';
import { EditarContrasenaComponent } from './pages/editar-contrasena/editar-contrasena.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';


const routes: Routes = [
  {
    path: 'lista-usuarios',
    canActivate: [AdminGuard],
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
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }

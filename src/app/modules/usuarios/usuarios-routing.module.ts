import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';


const routes: Routes = [
  {
    path: 'lista-usuarios',
    component: ListaUsuariosComponent
  },
  {
    path: 'ver-usuario/:id',
    component: VerUsuarioComponent
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }

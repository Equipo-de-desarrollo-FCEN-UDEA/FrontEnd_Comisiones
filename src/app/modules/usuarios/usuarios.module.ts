import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarContrasenaComponent } from './pages/editar-contrasena/editar-contrasena.component';


@NgModule({
  declarations: [
  
    VerUsuarioComponent,
       ListaUsuariosComponent,
       EditarUsuarioComponent,
       EditarContrasenaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }

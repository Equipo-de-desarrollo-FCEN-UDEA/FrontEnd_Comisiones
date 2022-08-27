import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarContrasenaComponent } from './pages/editar-contrasena/editar-contrasena.component';

import { NgbdSortableHeader } from '@shared/directivas/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { RegistrarUsuariosComponent } from './pages/registrar-usuarios/registrar-usuarios.component';



@NgModule({
  declarations: [
  
    VerUsuarioComponent,
    ListaUsuariosComponent,
    EditarUsuarioComponent,
    EditarContrasenaComponent,
    RegistrarUsuariosComponent

      // NgbdSortableHeader

  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgbModule,
    SharedModule
  ],
  providers:[
    // NgbdSortableHeader
  ]
})
export class UsuariosModule { }

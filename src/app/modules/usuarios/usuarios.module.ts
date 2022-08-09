import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader } from '@shared/directivas/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
  
    VerUsuarioComponent,
       ListaUsuariosComponent,
       EditarUsuarioComponent,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    // TablaSolicitudesComponent,
    RecuperarContrasenaComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  exports: [
    // TablaSolicitudesComponent,
  ],
  
})
export class SharedModule { }

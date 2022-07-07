import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAdministrativoRoutingModule } from './control-administrativo-routing.module';
import { ControlAdministrativoComponent } from './control-administrativo.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ControlAdministrativoComponent],
  exports: [ControlAdministrativoComponent],
  bootstrap: [ControlAdministrativoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ControlAdministrativoRoutingModule
  ]
})
export class ControlAdministrativoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { VerComisionComponent } from './pages/ver-comision/ver-comision.component';
import { CrearComisionComponent } from './pages/crear-comision/crear-comision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarComisionComponent } from './pages/editar-comision/editar-comision.component';
import { EstadosComisionComponent } from './pages/ver-comision/estados/estados-comision/estados-comision.component';
import { CumplidoComponent } from './pages/ver-comision/cumplidos/crear-cumplido/crear-cumplido.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    VerComisionComponent,
    CrearComisionComponent,
    EditarComisionComponent,
    EstadosComisionComponent,
    CumplidoComponent    
    
  ],
  imports: [
    CommonModule,
    ComisionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ],
  providers : [NgbActiveModal, NgbModalConfig]
})
export class ComisionesModule { }

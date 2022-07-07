import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlAdministrativoComponent } from './control-administrativo.component';

const routes: Routes = [{ path: 'control-administrativo', component: ControlAdministrativoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAdministrativoRoutingModule { }

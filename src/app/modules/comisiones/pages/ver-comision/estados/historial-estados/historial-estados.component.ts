import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { VerComisionComponent } from '../../ver-comision.component';



// // ----------------------------
@Component({
  selector: 'app-historial-estados',
  templateUrl: './historial-estados.component.html',
  styleUrls: ['./historial-estados.component.scss'],
  
})

export class HistorialEstadosComponent {

  @Input() estados: any;
  constructor() {
  }


}




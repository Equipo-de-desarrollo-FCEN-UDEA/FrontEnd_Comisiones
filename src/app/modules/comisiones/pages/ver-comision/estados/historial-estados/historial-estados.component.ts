import {  Component, Input } from '@angular/core';

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




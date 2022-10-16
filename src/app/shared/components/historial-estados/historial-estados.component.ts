import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-estados',
  templateUrl: './historial-estados.component.html',
  styleUrls: ['./historial-estados.component.scss']
})
export class HistorialEstadosComponent implements OnInit {

  @Input() estados: any;
  constructor() { }


  ngOnInit(): void {

  }

}

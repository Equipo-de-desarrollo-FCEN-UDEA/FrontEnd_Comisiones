import { Component, OnInit } from '@angular/core';
import { DiasHabiles } from '@shared/clases/dias-habiles';

@Component({
  template: `<app-tabla-solicitudes></app-tabla-solicitudes>`
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

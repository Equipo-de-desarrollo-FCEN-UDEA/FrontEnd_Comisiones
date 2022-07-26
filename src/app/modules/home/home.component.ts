import { Component, OnInit } from '@angular/core';
import { DiasHabiles } from '@shared/clases/dias-habiles';

@Component({
  template: `<app-solicitudes-tabla></app-solicitudes-tabla>`
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

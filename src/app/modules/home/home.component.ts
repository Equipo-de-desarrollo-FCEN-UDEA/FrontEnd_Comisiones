import { Component, OnInit } from '@angular/core';
import { DiasHabiles } from '@shared/clases/dias-habiles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    DiasHabiles(new Date(2020, 0, 2), new Date(2021, 0, 145));
  }

}

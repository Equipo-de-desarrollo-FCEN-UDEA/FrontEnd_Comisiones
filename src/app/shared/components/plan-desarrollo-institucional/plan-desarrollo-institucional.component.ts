import { Component, OnInit } from '@angular/core';
import { Tema, temas } from '@shared/data/plan-desarrollo';

@Component({
  selector: 'app-plan-desarrollo-institucional',
  templateUrl: './plan-desarrollo-institucional.component.html',
  styleUrls: ['./plan-desarrollo-institucional.component.scss']
})
export class PlanDesarrolloInstitucionalComponent implements OnInit {

  temas : Tema[] = temas;

  constructor() { }

  ngOnInit(): void {
  }

  select(value: string) {
    console.log(value)
  }

}

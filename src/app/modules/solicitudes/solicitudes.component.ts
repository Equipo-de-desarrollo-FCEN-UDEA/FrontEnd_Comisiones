import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  params = [true, false, false] 

  constructor() { }

  changeParams(params:boolean[]){
    this.params=params
    console.log(this.params)
    
  }

 

  

  

  ngOnInit(): void {
  }

}

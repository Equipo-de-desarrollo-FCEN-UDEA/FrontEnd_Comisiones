import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lateral-dedicacion',
  templateUrl: './menu-lateral-dedicacion.component.html',
  styleUrls: ['./menu-lateral-dedicacion.component.scss']
})
export class MenuLateralDedicacionComponent implements OnInit {

  params = [true, false, false] 

  // @Input() var : boolean[] = [true,false,false],
  @Output() paramsEmiter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleCarta(){
    this.params = [true, false, false]
    this.paramsEmiter.emit(this.params)
    
  }

  toggleFormatoVice(){
    this.params = [false, true, false]
    this.paramsEmiter.emit(this.params) 
    
  }

  togglePlanTrabajo(){
    this.params = [false, false, true]
    this.paramsEmiter.emit(this.params)
   
  }

}

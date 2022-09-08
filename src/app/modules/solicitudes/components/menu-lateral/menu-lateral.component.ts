import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  public rol : string = localStorage.getItem('rol') || '';

  params = [true, false, false] 

  // @Input() var : boolean[] = [true,false,false],
  @Output() paramsEmiter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor() { }

  togglePermiso(){
    this.params = [true, false, false]
    this.paramsEmiter.emit(this.params)
    
  }

  toggleComision(){
    this.params = [false, true, false]
    this.paramsEmiter.emit(this.params) 
    
  }

  toggleDexclusiva(){
    this.params = [false, false, true]
    this.paramsEmiter.emit(this.params)
   
  }

  ngOnInit(): void {

  }

}

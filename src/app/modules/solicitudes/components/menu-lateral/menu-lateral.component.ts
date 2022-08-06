import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  params = [true, false, false] 

  // @Input() var : boolean[] = [true,false,false],
  @Output() paramsEmiter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor() { }

  togglePermiso(){
    this.params = [true, false, false]
    this.paramsEmiter.emit(this.params)
    console.log('permiso')
  }

  toggleComision(){
    this.params = [false, true, false]
    this.paramsEmiter.emit(this.params) 
    console.log('permiso')
  }

  toggleDexclusiva(){
    this.params = [false, false, true]
    this.paramsEmiter.emit(this.params)
    console.log('permiso') 
  }

  ngOnInit(): void {

  }

}

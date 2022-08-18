import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DexclusivaService } from '@services/dedicaciones/dexclusiva.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';

@Component({
  selector: 'app-editar-dedicacion',
  templateUrl: './editar-dedicacion.component.html',
  styleUrls: ['./editar-dedicacion.component.scss']
})
export class EditarDedicacionComponent implements OnInit {

  @Input()
  isLinear = false;

  @Input()
  isEditable = true;

  public text = 'Hello world!';

  id$ : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  constructor(
    private dexclusivaSvc: DexclusivaService,
    private comunicacionSvc : CrearComisionComponentsService,
    private activatedRoute : ActivatedRoute
  ) { 

    let id : number;

    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
      this.comunicacionSvc.setId(id);
    });
  }

  ngOnInit(): void {
  
  }

}

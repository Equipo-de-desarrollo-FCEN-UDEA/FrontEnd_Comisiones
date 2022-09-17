import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { BehaviorSubject } from 'rxjs';
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
    private dedicacionSvc : DedicacionService,
    private comunicacionSvc : CrearComisionComponentsService,
    private activatedRoute : ActivatedRoute
  ) { 

    let id : number;

    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
      this.comunicacionSvc.setId(id);
      let dedicacion : DedicacionDTO;
      this.dedicacionSvc.getDedicacion(id).subscribe(
        (data: DedicacionDTO) => {
          dedicacion = data;
        });

      
    });

    
  }

  ngOnInit(): void {
  
  }

}

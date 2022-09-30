import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { BehaviorSubject } from 'rxjs';
import { PlanTrabajoComponent } from '../../components/plan-trabajo/plan-trabajo.component';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';

@Component({
  selector: 'app-editar-dedicacion',
  templateUrl: './editar-dedicacion.component.html',
  styleUrls: ['./editar-dedicacion.component.scss']
})
export class EditarDedicacionComponent implements OnInit {

  @ViewChild(PlanTrabajoComponent) child!: PlanTrabajoComponent;

  @Input()
  isLinear = false;

  @Input()
  isEditable = true;

  oneClick = 0

  public text : string = '';

  id$ : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  public dedicacion: any;

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
          this.dedicacion = dedicacion
          this.text = data.cartas?.body || '';
          this.comunicacionSvc.editCarta(data.cartas);
          this.comunicacionSvc.editFormato(data.formatosvice)
          this.comunicacionSvc.editPlan(data.plantrabajo)
        });

      
    });

    
  }


  planTrabajo(){
    if(this.oneClick==0){
      this.child.fillPlan()
      this.oneClick+=1;
    } 
  }


  ngOnInit(): void {
  
  }

}

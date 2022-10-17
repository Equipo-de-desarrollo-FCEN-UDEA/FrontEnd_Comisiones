import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { BehaviorSubject } from 'rxjs';
import { PlanTrabajoComponent } from '../../components/plan-trabajo/plan-trabajo.component';
import { CrearDedicacionComponentsService } from '../../services/crear-dedicacion-components.service';

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

  oneClick = 0;
  error:string = '';
  public text : string = '';

  params = [true, false, false];

  id$ : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  @Output() paramsEmiter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  public dedicacion: any;
  idDedicacion: string | number = '0';

  plantrabajo:any;
  editarPlanTrabajo: boolean = false; 

  formatoVice:any;
  editarFormatoVice: boolean = false; 

  carta:any;
  editarCarta: boolean = true; 


  

  constructor(
    private dedicacionSvc : DedicacionService,
    private comunicacionSvc : CrearDedicacionComponentsService,

    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe({
      next: (paramId) => {
        const id = paramId['id'];
        this.idDedicacion = id;
        if (id) {
          this.dedicacionSvc.getDedicacion(id).subscribe({
            next: (res: DedicacionDTO) => {
              this.dedicacion = res;
              this.text = res.cartas?.body || '';
              // this.comunicacionSvc.editCarta(res.cartas);
              // this.comunicacionSvc.editFormato(res.formatosvice)
              // this.comunicacionSvc.editPlan(res.plantrabajo)
              this.plantrabajo = res.plantrabajo;
              this.formatoVice = res.formatosvice;
              this.carta = res.cartas;
              
              this.editarPlanTrabajo = true;
              this.editarFormatoVice = true;
              

          }, error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg; // mensaje desde el back
               this.router.navigate(['/'])
            }
          }
          });
        }
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
        }
      },
    })

    
      
    //let id : number;
    //   params => {
    //   id = params['id'];
    //   this.comunicacionSvc.setId(id);
    //   let dedicacion : DedicacionDTO;
    //   this.dedicacionSvc.getDedicacion(id).subscribe(
    //     (data: DedicacionDTO) => {
    //       dedicacion = data;
    //       this.dedicacion = dedicacion
    //       this.text = data.cartas?.body || '';
    //       this.comunicacionSvc.editCarta(data.cartas);
    //       this.comunicacionSvc.editFormato(data.formatosvice)
    //       this.comunicacionSvc.editPlan(data.plantrabajo)
    //     });
    // });

    
  }


  // planTrabajo(){
  //   if(this.oneClick==0){
  //     this.child.fillPlan()
  //     this.oneClick+=1;
  //   } 
  // }


  ngOnInit(): void {
  
  }

  changeParams(params:boolean[]){
    this.params=params
    
  }

}

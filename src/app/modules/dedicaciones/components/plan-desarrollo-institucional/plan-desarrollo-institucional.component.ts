import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { plandesarrollo, tema, objetivo, accion, indicador } from '@interfaces/dedicaciones/plandesarrollo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { planDesarrolloFormat } from '@shared/data/plan-desarrollo';
import { prefix } from '@shared/data/ruta-api';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-plan-desarrollo-institucional',
  templateUrl: './plan-desarrollo-institucional.component.html',
  styleUrls: ['./plan-desarrollo-institucional.component.scss']
})



export class PlanDesarrolloInstitucionalComponent implements OnInit {

  @Input() planDesarrollo!: plandesarrollo;

  temas : tema[] = planDesarrolloFormat.temas;

  selectedPlanDesarrollo: plandesarrollo = {
    temas: []
  }

  FormPlan: FormGroup = this.fb.group({});

  selectedTema : number[]  = [];

  selectedTemas : tema[] = [];

  selectedObjetivo : number[]  = [];

  selectedObjetivos : objetivo[] = [];

  selectedAccion : string[] = [];


  acciones : any[] = [];

  selectedIndicadores : string[] = [];

  indicadores: any[] = [];

  logosurl = prefix + 'logos/';

  objetivos$: Subject<any[] | undefined> = new Subject();
  acciones$: Subject<any[] | undefined> = new Subject();
  inidcadores$: Subject<any[] | undefined> = new Subject();

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {


    if (this.planDesarrollo) {

    }
  }

  ngOnInit(): void {
    this.FormPlan = this.fb.group({
      steps: this.fb.array([
        this.fb.group({
          temas: ['', Validators.required]
        }),
        this.fb.group({
          objetivo: ['', Validators.required]
        }),
        this.fb.group({
          accion: ['', Validators.required]
        }),
        this.fb.group({
          indicador: ['', Validators.required]
        })
      ])}
    );
  }
  
  selectTema(value: number) {
    if (this.selectedTema.indexOf(value) != -1) {
      let index = this.selectedTema.indexOf(value);
      this.selectedTema.splice(index, 1);
      this.selectedPlanDesarrollo.temas.splice(index, 1)
    } else {
      this.selectedTema.push(value);
      this.selectedPlanDesarrollo.temas.push({
        id: value,
        titulo: this.temas[value].titulo,
        subtitulo: this.temas[value].subtitulo,
        objetivos: []
      })
    }
  }

  selectObjetivo(idObjetivo: number) {
    let index = this.selectedObjetivo.indexOf(idObjetivo);
    if (index != -1){
      this.selectedObjetivo.splice(index, 1);
      this.selectedObjetivos.splice(index, 1);
    } else {
      this.selectedObjetivo.push(idObjetivo);
      this.selectedObjetivos.push(objetivo);
    }
    
    let objetivos = ''
    for (let i = 0; i < this.selectedObjetivos.length; i++) {
      objetivos+= ' ' + this.selectedObjetivos[i].descripcion;
    }
    this.getSteps.patchValue([null, {objetivo: objetivos}]);
  }

  selectAccion(io:string, value: string) {
    let index = this.selectedAccion.indexOf(io);
    if (index != -1) {
      this.selectedAccion.splice(index, 1);
      this.acciones.slice(index, 1);
    } else {
      this.selectedAccion.push(io)
      this.acciones.push(value);
    }

    let acciones =''
    for (let i = 0; i < this.selectedAccion.length; i++) {
      acciones+= ' ' + this.acciones[i]
    }
    this.getSteps.patchValue([null,null,{accion:acciones}]);
  }

  selectIndicador(io:string, value: string) {
    let index = this.selectedIndicadores.indexOf(io);
    if (index != -1) {
      this.selectedIndicadores.splice(index, 1);
      this.indicadores.slice(index, 1);
    } else {
      this.selectedIndicadores.push(io)
      this.indicadores.push(value);
    }

    let indicadores =''
    for (let i = 0; i < this.selectedIndicadores.length; i++) {
      indicadores+= ' ' + this.indicadores[i]
    }
    this.getSteps.patchValue([null,null,null,{indicador:indicadores}]);
  }


  get getSteps() : FormArray {
    return this.FormPlan.get('steps') as FormArray;
  }


  get formArray(): AbstractControl {
    return this.FormPlan.get('steps') as AbstractControl;
  }


  submit() {
    this.activeModal.close(this.FormPlan.value);
  }

}

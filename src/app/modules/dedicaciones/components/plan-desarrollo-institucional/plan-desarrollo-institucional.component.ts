import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tema, temas, Objetivo } from '@shared/data/plan-desarrollo';
import { prefix } from '@shared/data/ruta-api';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-plan-desarrollo-institucional',
  templateUrl: './plan-desarrollo-institucional.component.html',
  styleUrls: ['./plan-desarrollo-institucional.component.scss']
})



export class PlanDesarrolloInstitucionalComponent implements OnInit {

  temas : Tema[] = temas;

  FormPlan: FormGroup = this.fb.group({});

  selectedTema : number[]  = [];

  selectedTemas : Tema[] = [];

  selectedObjetivo : string[]  = [];

  selectedObjetivos : Objetivo[] = [];

  selectedAccion : string[] = [];

  acciones : any[] = [];

  logosurl = prefix + 'logos/';

  objetivos$: Subject<any[] | undefined> = new Subject();
  acciones$: Subject<any[] | undefined> = new Subject();

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    
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
          indicador: this.fb.array([this.indicadorgroup()], [Validators.required])
        })
      ])}
    );
  }
  
  selectTema(value: number) {
    if (this.selectedTema.indexOf(value) != -1) {
      let index = this.selectedTema.indexOf(value);
      this.selectedTema.splice(index, 1);
      this.selectedTemas.splice(index, 1);
    } else {
      this.selectedTema.push(value);
      this.selectedTemas.push(this.temas[value]);
    }
    let temas = ''
    for (let i = 0; i < this.selectedTemas.length; i++) {
      temas += ' | ' + this.selectedTemas[i].titulo 
    }
    this.getSteps.patchValue([{temas: temas}])
  }

  selectObjetivo(iO: string, iT: string, objetivo: Objetivo) {
    let index = this.selectedObjetivo.indexOf(iO + iT);
    if (index != -1){
      this.selectedObjetivo.splice(index, 1);
      this.selectedObjetivos.splice(index, 1);
    } else {
      this.selectedObjetivo.push(iO + iT);
      this.selectedObjetivos.push(objetivo);
    }
    
    let objetivos = ''
    for (let i = 0; i < this.selectedObjetivos.length; i++) {
      objetivos+= ' | ' + this.selectedObjetivos[i].descripcion;
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
      acciones+= ' | ' + this.acciones[i]
    }
    this.getSteps.patchValue([null,null,{accion:acciones}]);
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

    indicadorgroup() {
    return this.fb.group({
      indicador: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get indicadorArr(): FormArray {
    const array = this.formArray
    return array.get('3')?.get('indicador') as FormArray;
  }

  addInputIndicador() {
    this.indicadorArr.push(this.indicadorgroup());
  }

  removeInput(controlName: string, index: number) {
    const control = this.indicadorArr;
    control.removeAt(index);
  }

}

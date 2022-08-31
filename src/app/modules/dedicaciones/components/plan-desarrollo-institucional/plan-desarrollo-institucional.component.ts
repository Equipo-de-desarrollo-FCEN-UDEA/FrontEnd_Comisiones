import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tema, temas } from '@shared/data/plan-desarrollo';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-plan-desarrollo-institucional',
  templateUrl: './plan-desarrollo-institucional.component.html',
  styleUrls: ['./plan-desarrollo-institucional.component.scss']
})
export class PlanDesarrolloInstitucionalComponent implements OnInit {

  temas : Tema[] = temas;

  FormPlan: FormGroup = this.fb.group({});

  selectedTema : number  = 1000;

  selectedObjetivo : number  = 1000;

  selectedAccion: number = 1000;

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
    this.selectedTema = value
    this.objetivos$.next(this.temas[value].objetivos)
    this.getSteps.patchValue([{temas: `${this.temas[value].titulo}`}])
    this.selectedObjetivo = 1000
  }

  selectObjetivo(value: number, objetivo: string, acciones: string[]) {
    this.selectedObjetivo = value
    this.acciones$.next(acciones)
    this.selectedAccion = 1000
    this.getSteps.patchValue([null,{objetivo:`${objetivo}` }])
  }

  selectAccion(index:number, value: string) {
    this.selectedAccion = index
    this.getSteps.patchValue([null,null, {accion: value}])
  }

  get getSteps() : FormArray {
    return this.FormPlan.get('steps') as FormArray;
  }

  get formArray(): AbstractControl {
    return this.FormPlan.get('steps') as AbstractControl;
  }

  submit() {
    // console.log(this.FormPlan.value)
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

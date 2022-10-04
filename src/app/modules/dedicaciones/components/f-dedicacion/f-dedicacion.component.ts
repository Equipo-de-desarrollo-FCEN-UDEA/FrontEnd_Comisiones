import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Dexclusiva, FormatosviceInside, FormatoVice } from '@interfaces/dedicaciones/formatovice';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { CookieService } from 'ngx-cookie-service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { Usuario, UsuarioResponse } from '@interfaces/usuario';
import { LoaderService } from '@services/interceptors/loader.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';
import Swal from 'sweetalert2';

import { FormatoViceService } from '@services/dedicaciones/formato-vice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas);
import { PlanDesarrolloInstitucionalComponent } from '../plan-desarrollo-institucional/plan-desarrollo-institucional.component';
import { planDesarrolloFormat } from '@shared/data/plan-desarrollo';
import { plandesarrollo } from '@interfaces/dedicaciones/plandesarrollo';

@Component({
  selector: 'app-f-dedicacion',
  templateUrl: './f-dedicacion.component.html',
  styleUrls: ['./f-dedicacion.component.scss']
})
export class FDedicacionComponent implements OnInit, AfterViewInit {

  private _editing : boolean = false;

  @Input() set editing(value: boolean){
    this._editing = value
  }

  private PlanDesarrollo!: plandesarrollo;

  private PlanDesarrolloFirstTake: number = 0;


  isLoading: Subject<boolean> = this.loadingSvc.isLoading;
  constructor(
    private fb: FormBuilder,
    private formatoSvc: FormatoViceService,
    private usuarioSvc: UsuarioService,
    private loadingSvc: LoaderService,
    private comunicationSvc: CrearComisionComponentsService,
    private modalSvc: NgbModal
  ) {
    this.usuarioSvc.getUsuario().subscribe(resp => this.Usuario = resp);
   }


  public campos = [
    'Docencia',
    'Extensión',
    'Investigación',
    'Administración'
  ]

  public Usuario : UsuarioResponse | undefined;



  fBasicInfo = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    tiempo_solicitado: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    campo_modalidad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50000)]],
    descripcion_comprobante: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    tema_estrategico: this.fb.array([this.temasgroup()], [Validators.required]),
    objetivo_estrategico_desarrollo: this.fb.array([this.objEstrategicasgroup()], [Validators.required]),
    metas: this.fb.array([this.metasgroup()], [Validators.required]),
    acciones_estrategicas: this.fb.array([this.acciones_estrategicasgroup()], [Validators.required]),
    objetivo_estrategico_institucional: this.fb.array([this.objetivo_estrategico_institucionalgroup()], [Validators.required]),
    indicador: this.fb.array([this.indicadorgroup()]),
    productos: this.fb.array([this.productosgroup()], [Validators.required]),
  })

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.comunicationSvc.editFormato$.subscribe(
      (formato: FormatosviceInside | null) => {
        if (formato){
          this.formatoSvc.getFormatoVice(formato.id).subscribe(
            (formato : any) =>{
              console.log(formato)
              // this.fBasicInfo.patchValue(formato)
              //Discutir backend
              
            }
          )
        }
      }
    )
  }

  onSubmit() {
    let Dedicacion = this.fBasicInfo.value as FormatoVice;

    let dedicacion_id: number | string = 0;

    this.comunicationSvc.id$.subscribe(
      (id: string | number) => {
        dedicacion_id = id;
      }
    );


    this.formatoSvc.postFormulario(Dedicacion, dedicacion_id).subscribe(
      (res: any) => {
        if (res) {
          Swal.fire({
            text: 'Formato generado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }
          )
          this.comunicationSvc.setFormatoSuccess(true);
        }
      }
    );


  }

  open() {
    const modalRef = this.modalSvc.open(PlanDesarrolloInstitucionalComponent, { size: 'xl' })
    modalRef.componentInstance.planDesarrollo = this.PlanDesarrollo
    modalRef.result.then(
      (res: any) => {
        this.PlanDesarrollo = res;
        console.log(this.PlanDesarrollo);
        this.PlanDesarrolloFirstTake++;
      }
    ).catch(
      (err:any) => {
        Swal.fire({
          icon: 'error',
          text: 'Algo ocurrió mal, vuelve a seleccional tu plan de desarrollo institucional',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }

  temasgroup() {
    return this.fb.group({
      tema: ['', [Validators.required]],
    });
  }

  get temasArr(): FormArray {
    return this.fBasicInfo.get('tema_estrategico') as FormArray;
  }
  addInputTemas() {
    this.temasArr.push(this.temasgroup());
  }


  // Objetivos Estrategicos
  objEstrategicasgroup() {
    return this.fb.group({
      objEstrategico: ['', [Validators.required]],
    });
  }

  get objEstrategicosArr(): FormArray {
    return this.fBasicInfo.get('objetivo_estrategico_desarrollo') as FormArray;
  }

  addInputObjEstrategicos() {
    this.objEstrategicosArr.push(this.objEstrategicasgroup());
  }




  // Metas

  metasgroup() {
    return this.fb.group({
      meta: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }


  get metasArr(): FormArray {
    return this.fBasicInfo.get('metas') as FormArray;
  }
  addInputMetas() {
    this.metasArr.push(this.metasgroup());
  }

  // Acciones Estrategicas
  acciones_estrategicasgroup() {
    return this.fb.group({
      accion: ['', [Validators.required]],
    });
  }


  get acciones_estrategicasArr(): FormArray {
    return this.fBasicInfo.get('acciones_estrategicas') as FormArray;
  }
  addInputacciones_estrategicas() {
    this.acciones_estrategicasArr.push(this.acciones_estrategicasgroup());
  }


  // Objetivo Estrategico Institucional
  objetivo_estrategico_institucionalgroup() {
    return this.fb.group({
      objetivo: ['', [Validators.required]],
    });
  }

  get objetivo_estrategico_institucionalArr(): FormArray {
    return this.fBasicInfo.get('objetivo_estrategico_institucional') as FormArray;
  }

  objetivo_estrategico_institucional() {
    this.objetivo_estrategico_institucionalArr.push(this.objetivo_estrategico_institucionalgroup());
  }

  // Indicador
  indicadorgroup() {
    return this.fb.group({
      indicador: [''],
    });
  }

  get indicadorArr(): FormArray {
    return this.fBasicInfo.get('indicador') as FormArray;
  }

  addInputIndicador() {
    this.indicadorArr.push(this.indicadorgroup());
  }


  // Productos

  productosgroup() {
    return this.fb.group({
      producto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get productosArr(): FormArray {
    return this.fBasicInfo.get('productos') as FormArray;
  }

  addInputProductos() {
    this.productosArr.push(this.productosgroup());
  }


  // Eliminar del control
  removeInput(controlName: string, index: number) {
    const control = this.fBasicInfo.get(controlName) as FormArray;
    control.removeAt(index);
  }




  isInvalidForm(controlName: string) {
    return this.fBasicInfo.get(controlName)?.invalid && this.fBasicInfo.get(controlName)?.touched;
  }

}

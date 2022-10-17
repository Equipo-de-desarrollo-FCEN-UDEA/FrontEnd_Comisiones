import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '@services/interceptors/loader.service';
import { PlanTrabajoService } from '@services/dedicaciones/plan-trabajo.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { empty, Observable, Subject, switchMap } from 'rxjs';
import { PlanTrabajo, PlanTrabajoInside } from '@interfaces/dedicaciones/plantrabajo';
import { CrearDedicacionComponentsService } from '../../services/crear-dedicacion-components.service';
import Swal from 'sweetalert2';
import { AmazingTimePickerModule, AmazingTimePickerService } from 'amazing-time-picker';
import { ThisReceiver } from '@angular/compiler';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';


@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.scss']
})


export class PlanTrabajoComponent implements OnInit {

  planTrabajo: any;
  planTrabajo_id: number | string = 0;
  @Input() editable: any;
  @Input() idDedicacion: number | string = 0;

  public dedicacion: any;
  error: any = '';


  private _editing: boolean = false;

  @Input() set editing(value: boolean) {
    this._editing = value
  }


  @ViewChild('c1')
  private c1!: ElementRef;

  isLoading: Subject<boolean> = this.loadingSvc.isLoading;

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private planTrabajoSvc: PlanTrabajoService,
    private loadingSvc: LoaderService,
    private comunicacionSvc: CrearDedicacionComponentsService,
    private atp: AmazingTimePickerService,

    private dedicacionSvc: DedicacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    // this.comunicacionSvc.id$.subscribe(id => {
    //   console.log('id en plan', id)
    // }).unsubscribe();

    for (let i = 0; i < 4; i++) {
      this.jornadaTrabajoArr.push(this.jornadaTrabajoGroup());
    }
    this.jornadaTrabajoArr.push(this.fb.group(
      {
        mañana: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        mañana2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        tarde: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        tarde2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }
    ));

  }

  // public usuario = this.usuarioSvc.getActualUsuario();
  public semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  fPlanTrabajo = this.fb.group({
    semestre: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
    registro: ['', [Validators.required]],
    // tipo_vinculacion: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    tiempo_parcial: [NaN, [Validators.required]],
    // escalafon: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    actividades_docencia: this.fb.array([this.actividadesDocenciaGroup()], [Validators.required]),
    actividades_investigacion: this.fb.array([this.actividadesInvestigacionGroup()], [Validators.required]),
    actividades_extension: this.fb.array([this.actividadesExtensionGroup()], [Validators.required]),
    administracion_academica: this.fb.array([this.actividadesAdministracionAcademicaGroup()], [Validators.required]),
    otras_actividades: this.fb.array([this.actividadesOtrasActividadesGroup()], [Validators.required]),
    seguimiento_actividades: this.fb.array([this.seguimientoActividadesGroup()], [Validators.required]),
    jornada_trabajo: this.fb.array([this.jornadaTrabajoGroup()], [Validators.required]),
    observaciones_generales: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
  });


  ngOnInit(): void {
    console.log(this.idDedicacion)


    if (this.editable) {

      this.activatedRoute.params.subscribe({
        next: (paramId) => {
          this.idDedicacion = paramId['id'];
        }
      })
      console.log('es editable', this.idDedicacion)
  
     
      this.dedicacionSvc.getDedicacion(this.idDedicacion).subscribe({
        next: (res: DedicacionDTO) => {

          this.planTrabajo = res.plantrabajo;

          if(this.planTrabajo){
            this.planTrabajo_id = this.planTrabajo.id;
            this.fPlanTrabajo.patchValue({
              semestre: this.planTrabajo.semestre,
              registro: this.planTrabajo.registro,
              tiempo_parcial: this.planTrabajo.tiempo_parcial,
              observaciones_generales: this.planTrabajo.observaciones_generales
            });
  
            console.log(this.planTrabajo)
  
            this.patchActividadesDocencia(this.planTrabajo.actividades_docencia)
            this.patchActividadesInvestigacion(this.planTrabajo.actividades_investigacion)
            this.patchActividadesExtension(this.planTrabajo.actividades_extension)
            this.patchActividadesAdministracionAcademica(this.planTrabajo.administracion_academica)
            this.patchActividadesOtrasActividades(this.planTrabajo.otras_actividades)
            this.patchSeguimientoActividades(this.planTrabajo.seguimiento_actividades)
            this.patchJornadaTrabajo(this.planTrabajo.jornada_trabajo)
          }

          
        }, error: (err) => {
          if (err.status === 404 || err.status === 401) {
            this.error = err.error.msg; // mensaje desde el back
            this.router.navigate(['/'])
          }
        }
      });



    }

  }

  // sum(obj: any) {
  //   var sum = 0;
  //   for (var el in obj) {
  //     if (obj.hasOwnProperty(el)) {
  //       sum += parseFloat(obj[el]);
  //     }
  //   }
  //   return sum;
  // }


  // ------------------------------
  // --------- PATCHS -----------
  // ------------------------------

  patchActividadesDocencia(actividad: any) {
    for (let i = 0; i < actividad.length - 1; i++) {
      this.addActividadDocencia();
    }
    this.actividadesDocenciaArr.patchValue(actividad);

  }

  patchActividadesInvestigacion(actividad: any) {
    for (let i = 0; i < actividad.length -1; i++) {
      this.addActividadInvestigacion();
    }
    this.actividadesInvestigacionArr.patchValue(actividad);
  }

  patchActividadesExtension(actividad: any) {
    for (let i = 0; i < actividad.length -1 ; i++) {
      this.addActividadExtension();
    }
    this.actividadesExtensionArr.patchValue(actividad);
  }

  patchActividadesAdministracionAcademica(actividad: any) {
    for (let i = 0; i < actividad.length -1 ; i++) {
      this.addActividadAdministracionAcademica();
    }
    this.actividadesAdministracionAcademicaArr.patchValue(actividad);
  }

  patchActividadesOtrasActividades(actividad: any) {
    for (let i = 0; i < actividad.length -1 ; i++) {
      this.addActividadOtrasActividades();
    }
    this.actividadesOtrasActividadesArr.patchValue(actividad);
  }

  patchSeguimientoActividades(actividad: any) {
    for (let i = 0; i < actividad.length - 1; i++) {
      this.addSeguimientoActividades();
    }
    this.seguimientoActividadesArr.patchValue(actividad);
  }

  patchJornadaTrabajo(actividad: any) {
      this.jornadaTrabajoArr.patchValue(actividad);
  }


  // fillPlan(): void {
  //   console.log('ENTRA A PLAN')
  //   const planTrabajo$ = this.comunicacionSvc.editPlan$.pipe(
  //     switchMap(
  //       (planInside: PlanTrabajoInside | null) => {
  //         if (planInside) {
  //           return this.planTrabajoSvc.getPlanTrabajo(planInside.id)
  //         } else {
  //           return this.planTrabajoSvc.getPlanTrabajo(0)
  //         }
  //       }
  //     )
  //   )
  //   console.log(planTrabajo$)

  //   planTrabajo$.subscribe(
  //     (planTrabajo: PlanTrabajo) => {
  //       this.fPlanTrabajo.patchValue(planTrabajo)
  //     }
  //   )
  // }



  // ------------------------------
  // --------- GETTERS -----------
  // ------------------------------


  get actividadesDocenciaArr(): FormArray {
    return this.fPlanTrabajo.get('actividades_docencia') as FormArray;
  }

  get actividadesInvestigacionArr(): FormArray {
    return this.fPlanTrabajo.get('actividades_investigacion') as FormArray;
  }

  get actividadesExtensionArr(): FormArray {
    return this.fPlanTrabajo.get('actividades_extension') as FormArray;
  }

  get actividadesAdministracionAcademicaArr(): FormArray {
    return this.fPlanTrabajo.get('administracion_academica') as FormArray;
  }

  get actividadesOtrasActividadesArr(): FormArray {
    return this.fPlanTrabajo.get('otras_actividades') as FormArray;
  }

  get seguimientoActividadesArr(): FormArray {
    return this.fPlanTrabajo.get('seguimiento_actividades') as FormArray;
  }

  get jornadaTrabajoArr(): FormArray {
    return this.fPlanTrabajo.get('jornada_trabajo') as FormArray;
  }


  // ------------------------------
  // --------- GROUPS -----------
  // ------------------------------

  actividadesDocenciaGroup() {
    return this.fb.group({
      identificacion_actividad: this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        grupo: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
        nombre: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      }),
      numero_estudiantes: [NaN, [Validators.required]],
      nivel: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      horas_semana: this.fb.group({
        T: [NaN, [Validators.required]],
        TP: [NaN, [Validators.required]],
        P: [NaN, [Validators.required]],
      }),
      total_horas: this.fb.group({
        semanal: [NaN, [Validators.required]],
        semestral: [NaN, [Validators.required]],
      })
    })
  }

  //Actividades de Investigación
  actividadesInvestigacionGroup() {
    return this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      identificacion_proyecto: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsabilidad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      costo_responsable: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      acta_respaldo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [NaN, [Validators.required]],
    });

  }

  //Actividades de Extensión
  actividadesExtensionGroup() {
    return this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsabilidad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      costo_responsable: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semana: [NaN, [Validators.required]],
      horas_semestre: [NaN, [Validators.required]],
    });
  }

  // Actividades de Administración Académica
  actividadesAdministracionAcademicaGroup() {
    return this.fb.group({
      cargo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [NaN, [Validators.required]],
      otras_actividades: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      otras_horas_semestre: [NaN, [Validators.required]],
    });
  }

  // Actividades de Otras Actividades
  actividadesOtrasActividadesGroup() {
    return this.fb.group({
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [NaN, [Validators.required]],
    });
  }

  // jornada de trabajo
  jornadaTrabajoGroup() {
    return this.fb.group({
      mañana: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      mañana2: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      tarde: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      tarde2: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
    });
  }

  // seguimiento actividaddes
  seguimientoActividadesGroup() {
    return this.fb.group({
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      fecha_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      fecha_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      otros: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    });
  }



  // ------------------------------
  // --------- ADD CARDS -----------
  // ------------------------------

  addActividadDocencia() {
    let div = document.getElementById('c1')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.actividadesDocenciaArr.push(this.actividadesDocenciaGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

  addJornadaTrabajo() {
    // jornada de trabajo
    this.jornadaTrabajoArr.push(this.jornadaTrabajoGroup());
  }

  addActividadAdministracionAcademica() {
    let div = document.getElementById('c3')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.actividadesAdministracionAcademicaArr.push(this.actividadesAdministracionAcademicaGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }

  }

  addSeguimientoActividades() {
    let div = document.getElementById('c5')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.seguimientoActividadesArr.push(this.seguimientoActividadesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

  addActividadOtrasActividades() {
    let div = document.getElementById('c4')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.actividadesOtrasActividadesArr.push(this.actividadesOtrasActividadesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }

  }



  addActividadInvestigacion() {
    let div = document.getElementById('c8')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.actividadesInvestigacionArr.push(this.actividadesInvestigacionGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }

  }

  addActividadExtension() {
    let div = document.getElementById('c2')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.actividadesExtensionArr.push(this.actividadesExtensionGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

  // ------------------------------
  // -------- REMOVE CARDS --------
  // ------------------------------

  removeInput(controlName: string, index: number) {
    const control = this.fPlanTrabajo.get(controlName) as FormArray;
    control.removeAt(index);
  }

  // ------------------------------
  // --------- ENVIAR -------------
  // ------------------------------
  onSubmit() {

    // let dedicacion_id: number | string = 0;

    // this.comunicacionSvc.id$.subscribe(id => {
    //   console.log('id', id)
    //   dedicacion_id = id;
    // }).unsubscribe();


    const plan: PlanTrabajo = {
      ... this.fPlanTrabajo.value as PlanTrabajo,
      dedicaciones_id: this.idDedicacion,

    }


    this.loadingSvc.show();

    if (this.editable && this.planTrabajo_id) {
      this.planTrabajoSvc.updatePlanTrabajo(this.planTrabajo_id, plan).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire(
              {
                title: 'El Plan de trabajo se ha actualizado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }
            )
            this.comunicacionSvc.setPlanSuccess(true);
            this.loadingSvc.hide();
          }
        });
    }
    else{
      this.planTrabajoSvc.postPlanTrabajo(plan).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire(
              {
                title: 'El Plan de trabajo se ha guardado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }
            )
            this.comunicacionSvc.setPlanSuccess(true);
            this.loadingSvc.hide();
          }
        });
    }
    
  }



}

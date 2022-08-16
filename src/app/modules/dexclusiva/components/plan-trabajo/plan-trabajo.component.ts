import { formatDate } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '@services/interceptors/loader.service';
import { PlanTrabajoService } from '@services/dedicaciones/plan-trabajo.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.scss']
})
export class PlanTrabajoComponent implements OnInit {

  isLoading: Subject<boolean> = this.loadingSvc.isLoading;

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private loaderService: LoaderService,
    private planTrabajoSvc: PlanTrabajoService,
    private loadingSvc: LoaderService
  ) { }

  public usuario = this.usuarioSvc.getActualUsuario();
  public semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  fPlanTrabajo = this.fb.group({
    semestre: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
    registro: [Number,[Validators.required]],
    tipo_vinculacion: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    tiempo_parcial: [Number,[Validators.required]],
    escalafon: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    actividades_docencia: this.fb.array([this.actividadesDocenciaGroup()],[Validators.required]),
    actividades_investigacion: this.fb.array([this.actividadesInvestigacionGroup()],[Validators.required]),
    actividades_extension: this.fb.array([this.actividadesExtensionGroup()],[Validators.required]),
    administracion_academica: this.fb.array([this.actividadesAdministracionAcademicaGroup()],[Validators.required]),
    otras_actividades: this.fb.array([this.actividadesOtrasActividadesGroup()],[Validators.required]),
    seguimiento_actividades: this.fb.array([this.seguimientoActividadesGroup()],[Validators.required]),
    jornada_trabajo: this.fb.array([this.jornadaTrabajoGroup()],[Validators.required]),
    observaciones_generales: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
  });


  ngOnInit(): void {
    for (let i=0; i<5; i++) {
    this.jornadaTrabajoArr.push(this.jornadaTrabajoGroup());
    }
  }

  //Actividades de Docencia

  actividadesDocenciaGroup (){
    return this.fb.group({
      identificacion_actividad: this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        grupo: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
        nombre: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      }),
      numero_estudiantes: [Number,[Validators.required]],
      nivel: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      horas_semana: this.fb.group({
        T: [Number,[Validators.required]],
        TP : [Number,[Validators.required]],
        P : [Number,[Validators.required]],
      }),
      total_horas: this.fb.group({
        semanal : [Number,[Validators.required]],
        semestral : [Number,[Validators.required]],
      })
    })
  }

  get actividadesDocenciaArr():FormArray{
    return this.fPlanTrabajo.get('actividades_docencia') as FormArray;
  }

  addActividadDocencia(){
    this.actividadesDocenciaArr.push(this.actividadesDocenciaGroup());
  }


  //Actividades de Investigación

  actividadesInvestigacionGroup (){
    return this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      identificacion_proyecto: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsabilidad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      costo_responsable: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      acta_respaldo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [Number,[Validators.required]],
    });

  }

  get actividadesInvestigacionArr():FormArray{
    return this.fPlanTrabajo.get('actividades_investigacion') as FormArray;
  }

  addActividadInvestigacion(){
    this.actividadesInvestigacionArr.push(this.actividadesInvestigacionGroup());
  }


  //Actividades de Extensión

  actividadesExtensionGroup (){
    return this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsabilidad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      costo_responsable: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semana: [Number,[Validators.required]],
      horas_semestre: [Number,[Validators.required]],
    });
  }

  get actividadesExtensionArr():FormArray{
    return this.fPlanTrabajo.get('actividades_extension') as FormArray;
  }

  addActividadExtension(){
    this.actividadesExtensionArr.push(this.actividadesExtensionGroup());
  }

  // Actividades de Administración Académica
  actividadesAdministracionAcademicaGroup (){
    return this.fb.group({
      cargo: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [Number,[Validators.required]],
      otras_actividades: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      otras_horas_semestre: [Number,[Validators.required]],
    });
  }

  get actividadesAdministracionAcademicaArr():FormArray{
    return this.fPlanTrabajo.get('administracion_academica') as FormArray;
  }

  addActividadAdministracionAcademica(){
    this.actividadesAdministracionAcademicaArr.push(this.actividadesAdministracionAcademicaGroup());
  }

  // Actividades de Otras Actividades

  actividadesOtrasActividadesGroup (){
    return this.fb.group({
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      horas_semestre: [Number,[Validators.required]],
    });
  }

  get actividadesOtrasActividadesArr():FormArray{
    return this.fPlanTrabajo.get('otras_actividades') as FormArray;
  }

  addActividadOtrasActividades(){
    this.actividadesOtrasActividadesArr.push(this.actividadesOtrasActividadesGroup());
  }

  // seguimiento actividaddes

  seguimientoActividadesGroup (){
    return this.fb.group({
      identificacion_actividad: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      fecha_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      fecha_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      otros: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
  });
}

  get seguimientoActividadesArr():FormArray{
    return this.fPlanTrabajo.get('seguimiento_actividades') as FormArray;
  
  }
  addSeguimientoActividades(){
    this.seguimientoActividadesArr.push(this.seguimientoActividadesGroup());
  }

  // jornada de trabajo

  jornadaTrabajoGroup (){
    return this.fb.group({
      mañana: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      tarde: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    });
  }

  get jornadaTrabajoArr():FormArray{
    return this.fPlanTrabajo.get('jornada_trabajo') as FormArray;
  }

  addJornadaTrabajo(){
    this.jornadaTrabajoArr.push(this.jornadaTrabajoGroup());
  }



  removeInput(controlName: string, index: number) {
    const control = this.fPlanTrabajo.get(controlName) as FormArray;
    control.removeAt(index);
  }


  onSubmit() {
    console.log(this.fPlanTrabajo.value);
    this.planTrabajoSvc.postPlanTrabajo(this.fPlanTrabajo.value).subscribe();
  }

}

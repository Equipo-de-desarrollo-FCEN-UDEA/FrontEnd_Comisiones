import { NONE_TYPE } from '@angular/compiler';
import { AfterContentInit, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { IntermediateDedicaciones, IntermediateFormatos, IntermediateFormatosAccion } from '@interfaces/dedicaciones/formatovice';
import { plandesarrollo, Objetivo, Acciones, IntermediateObjetivosIndicadores, ObjetivoTemaId, Tema } from '@interfaces/dedicaciones/plandesarrollo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanDesarrolloService } from '@services/dedicaciones/plan-desarrollo.service';
import { prefix } from '@shared/data/ruta-api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plan-desarrollo-institucional',
  templateUrl: './plan-desarrollo-institucional.component.html',
  styleUrls: ['./plan-desarrollo-institucional.component.scss']
})




export class PlanDesarrolloInstitucionalComponent implements OnInit, AfterViewChecked {

  @Input() intermadiateFormatosIn: IntermediateFormatos[] = [];
  @Input() intermediateFormatosAccion: IntermediateFormatosAccion[] = [];



  temas: Tema[] = [];


  selectedPlanDesarrollo: plandesarrollo = { temas: [] };

  selectedTema: number[] = [];

  selectedTemas: Tema[] = [];

  selectedObjetivo: number[] = [];


  selectedObjetivos: ObjetivoTemaId[] = [];

  selectedAccion: number[] = [];

  objetivos_has_indicador: number[] = [];

  acciones: any[] = [];

  selectedIndicadores: number[] = [];

  indicadores: any[] = [];

  logosurl = prefix + 'logos/';

  objetivos$: Subject<any[] | undefined> = new Subject();
  acciones$: Subject<any[] | undefined> = new Subject();
  inidcadores$: Subject<any[] | undefined> = new Subject();

  constructor(
    public activeModal: NgbActiveModal,
    private planDesarrolloSvc: PlanDesarrolloService
  ) {

  }

  ngOnInit(): void {
    this.planDesarrolloSvc.getPlanDesarrollo().subscribe(
      data => {
        this.temas = data
        if (this.intermadiateFormatosIn) {
          this.selectedTema = [... new Set(this.intermadiateFormatosIn.map(
            intermediate => intermediate.intermediate_objetivos_indicadores.objetivos.temas_id
          ))]

          this.selectedObjetivo = [... new Set(this.intermadiateFormatosIn.map(
            intermadiate => intermadiate.intermediate_objetivos_indicadores.objetivos_id
          ))]

          this.selectedIndicadores = [... new Set(this.intermadiateFormatosIn.map(
            intermediate => {
              this.objetivos_has_indicador.push(intermediate.intermediate_objetivos_indicadores.id)
              return intermediate.intermediate_objetivos_indicadores.indicadores_id}
          ))]


          this.selectedAccion = [... new Set(this.intermediateFormatosAccion.map(
            intermediate => intermediate.acciones_id
          ))]


          this.temas.forEach(tema => {
            if (this.selectedTema.indexOf(tema.id) != -1) {
              this.selectedTemas.push(tema)
              this.selectedPlanDesarrollo.temas.push({
                id: tema.id,
                titulo: tema.titulo,
                subtitulo: tema.subtitulo,
                objetivos: tema.objetivos.filter(objetivo => this.selectedObjetivo.indexOf(objetivo.id) != -1)
              })
              const objetivos = tema.objetivos.filter(objetivo => this.selectedObjetivo.indexOf(objetivo.id) != -1)
              objetivos.forEach(objetivo => {
                this.selectedObjetivos.push({
                  ...objetivo,
                  idTema: tema.id
                })
              })
              // tema.objetivos.forEach(objetivo => {
              //   if (this.selectedObjetivo.indexOf(objetivo.id) != -1) {

              //   }
              // })
            }
          })

        }
      }
    )
  }

  ngAfterViewChecked(): void {

  }

  selectTema(value: number, tema: Tema) {
    if (this.selectedTema.indexOf(value) != -1) {
      let index = this.selectedTema.indexOf(value);
      this.selectedTema.splice(index, 1);
      this.selectedTemas.splice(index, 1)
      this.selectedPlanDesarrollo.temas.splice(index, 1)
    } else {
      this.selectedTema.push(value);
      this.selectedTemas.push(tema)
      this.selectedPlanDesarrollo.temas.push({
        id: value,
        titulo: tema.titulo,
        subtitulo: tema.subtitulo,
        objetivos: []
      })
    }
  }

  selectObjetivo(objetivo: Objetivo, idTema: number) {
    let index = this.selectedObjetivo.indexOf(objetivo.id);
    let indexOfTema = this.selectedTema.indexOf(idTema)
    if (index != -1) {
      this.selectedObjetivo.splice(index, 1);
      this.selectedObjetivos.splice(index, 1);
      let indexObjetivo = this.selectedPlanDesarrollo.temas[indexOfTema].objetivos.indexOf(objetivo)
      this.selectedPlanDesarrollo.temas[indexOfTema].objetivos.splice(indexObjetivo, 1)
    } else {
      this.selectedObjetivo.push(objetivo.id);
      this.selectedObjetivos.push({ ...objetivo, idTema: idTema });
      this.selectedPlanDesarrollo.temas[indexOfTema].objetivos.push({
        id: objetivo.id,
        descripcion: objetivo.descripcion,
        acciones: [],
        intermediate_objetivos_indicadores: []
      })
    }
  }

  selectAccion(accion: Acciones, objetivo: ObjetivoTemaId) {
    let index = this.selectedAccion.indexOf(accion.id);
    let indexOfTema = this.selectedTema.indexOf(objetivo.idTema)
    let indexObjetivo = this.selectedPlanDesarrollo.temas[indexOfTema].objetivos.map(objetivo => objetivo.id).indexOf(objetivo.id)
    if (index != -1) {
      this.selectedAccion.splice(index, 1);
      this.acciones.splice(index, 1);
      let indexAccion = this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].acciones.indexOf(accion)
      // this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].acciones.splice(indexAccion, 1)
    } else {
      this.selectedAccion.push(accion.id)
      // this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].acciones.push(accion)
    }
  }

  selectIndicador(indicador: IntermediateObjetivosIndicadores, objetivo: ObjetivoTemaId) {
    let index = this.selectedIndicadores.indexOf(indicador.indicadores_id);
    let indexOfTema = this.selectedTema.indexOf(objetivo.idTema)
    let indexObjetivo = this.selectedPlanDesarrollo.temas[indexOfTema].objetivos.map(objetivo => objetivo.id).indexOf(objetivo.id)
    if (index != -1) {
      this.selectedIndicadores.splice(index, 1);
      this.indicadores.slice(index, 1);
      this.objetivos_has_indicador.splice(index, 1)
      let indexIndicador = this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].intermediate_objetivos_indicadores.indexOf(indicador);
      // this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].intermediate_objetivos_indicadores.splice(indexIndicador, 1);
    } else {
      this.objetivos_has_indicador.push(indicador.id)
      this.selectedIndicadores.push(indicador.indicadores_id);
      // this.selectedPlanDesarrollo.temas[indexOfTema].objetivos[indexObjetivo].intermediate_objetivos_indicadores.push(indicador);
    }

  }



  submit() {
    console.log(this.objetivos_has_indicador)
    console.log(this.selectedAccion)
    this.activeModal.close({acciones: this.selectedAccion, objetivos_has_indicador: this.objetivos_has_indicador})
  }

}

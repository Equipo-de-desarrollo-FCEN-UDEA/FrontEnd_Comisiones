import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { DiasHabiles } from '@shared/clases/dias-habiles';
import { DatePipe } from '@angular/common';
import { PaisesCiudadesService } from '@services/paises-ciudades.service';
import { Ciudad, Pais, Estado } from '@interfaces/paises-ciudades';

// ----------- SERVICIOS ------------
import { ComisionesService } from '@services/comisiones.service';
import { TipoComision } from '@interfaces/tipos_comision';

@Component({
  selector: 'app-editar-comision',
  templateUrl: './editar-comision.component.html',
  styleUrls: ['./editar-comision.component.scss']
})
export class EditarComisionComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  today = this.calendar.getToday();

  editarComision: FormGroup;
  error = '';
  //tiposComision$: Observable<TipoComision[]>;
  

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;


  getId: any;
  submitted = false;
  files : any[]=[];
  archivos = [1];


  clicked = 0


 // ------------ CONSTRUCTOR ---------------
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private comisionesSvc: ComisionesService,
    private loaderSvc: LoaderService,
    private datepipe: DatePipe
  ) { 

    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    this.comisionesSvc.getComision(this.getId).subscribe({
      next: (res) => {
        this.editarComision.setValue({
          tipos_comision: res.tipos_comision.nombre,
          justificacion: res.justificacion,
          idioma: res.idioma,
          lugar: res.lugar,
          fecha_inicio: this.datepipe.transform(res.fecha_inicio, 'YYYY-MM-dd'),
          fecha_fin: this.datepipe.transform(res.fecha_fin, 'YYYY-MM-dd'),
        });
        console.log(res);
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          //this.loading = false;
        }
      },
    });

    this.editarComision = this.formBuilder.group({
      tipos_comision: ['', Validators.required],
      justificacion: ['', Validators.required],
      lugar: ['', Validators.required],
      idioma: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });

    this.fromDate = null;
}


  ngOnInit(): void {
    
  }

  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {
    return this.editarComision.controls;
  }


  // ----------- EDITAR COMISION ------------
  onUpdate(): any {

    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.editarComision.invalid) {
      return;
    }
  }

  
  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------
  
  inRange(fecha_1 : any, fecha_2 : any){
    fecha_1 = new Date(this.formatter.format(fecha_1));
    fecha_2 = new Date(this.formatter.format(fecha_2));
    console.log('paso')
    console.log(fecha_1)
    console.log(DiasHabiles(fecha_1, fecha_2), fecha_1, fecha_2)
    return DiasHabiles(fecha_1, fecha_2);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.editarComision.patchValue({
      fecha_inicio : this.formatter.format(this.fromDate),
      fecha_fin : this.formatter.format(this.toDate)
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}

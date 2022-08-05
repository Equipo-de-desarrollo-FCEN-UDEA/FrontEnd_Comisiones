import { ChangeDetectorRef, Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { TipoComisionService } from '@services/tipo-comision.service';

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

  editarComisionForm: FormGroup;
  error = '';
  tiposComision$: Observable<TipoComision[]>;
  

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;


  getId: any;
  submitted = false;
  files : any[]=[];
  archivos = [1];


  clicked = 0;



 // ------------ CONSTRUCTOR ---------------
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private datepipe: DatePipe,

    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    
    private comisionSvc: ComisionesService,
    private tipoComisionSvc: TipoComisionService,
    private loaderSvc: LoaderService,
    
    private activateRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router
  ) { 

    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.tiposComision$ = this.tipoComisionSvc.getTipoSolicitud();

    // Trae los valores actuales de la comisión
    this.comisionSvc.getComision(this.getId).subscribe({
      next: (res) => {
        this.editarComisionForm.setValue({
          tipo_comision_id: res.tipos_comision.nombre,
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

    this.editarComisionForm = this.formBuilder.group({
      tipo_comision_id: ['', [Validators.required, Validators.nullValidator]],
      justificacion: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(350)]],
      lugar: ['', [Validators.required, Validators.nullValidator]],
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
  
    return this.editarComisionForm.controls;
  }

  // ----------- TIPO DE SOLICITUD ------------

  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
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
    this.editarComisionForm.patchValue({
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

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
    console.log(this.files)

  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
    this.archivos.splice(index, 1);};
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  isInvalidForm(controlName: string) {
    return this.editarComisionForm.get(controlName)?.invalid && this.editarComisionForm.get(controlName)?.touched;
  }


 // ----------- EDITAR COMISION ------------
  onUpdate(): any {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.editarComisionForm.invalid) {
      console.log('invalid form')
      return;
    }

    console.log(this.editarComisionForm);

    // this.comisionSvc.updateComision(this.getId, this.editarComisionForm.value)
    // .subscribe({
    //   next: (res) => {
    //     // facilitate change detection
    //     this.ngZone.run(() =>
    //       this.router.navigateByUrl(`/comisiones/ver-comision/${this.getId}`)
    //     );
    //   },
    //   error: (err) => {
    //     if (err.status === 404 || err.status === 401) {
    //       this.error = err.error.msg;
    //     }
    //   },
    // });

    
  }


  

}

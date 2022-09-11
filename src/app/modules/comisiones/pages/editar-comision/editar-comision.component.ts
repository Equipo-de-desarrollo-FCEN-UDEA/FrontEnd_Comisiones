import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// --------- SERVICIOS E INTERFACES ---------
import { ComisionesService } from '@services/comisiones/comisiones.service';
import { TipoComision } from '@interfaces/tipos_comision';
import { TipoComisionService } from '@services/comisiones/tipo-comision.service';
import { Comision } from '@interfaces/comisiones';
import { PaisesCiudadesService } from '@services/paises-ciudades.service';
import { Ciudad, Pais, Estado } from '@interfaces/paises-ciudades';
import { LoaderService } from '@services/interceptors/loader.service';
import { DiasHabiles } from '@shared/clases/dias-habiles';




@Component({
  selector: 'app-editar-comision',
  templateUrl: './editar-comision.component.html',
  styleUrls: ['./editar-comision.component.scss']
})
export class EditarComisionComponent implements OnInit {

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  public error = '';
  public clicked = 0;
  public submitted = false;

  // Tipos de comision desde back
  public tiposComision$: Observable<TipoComision[]>;
  public editarComisionForm: FormGroup;

  @ViewChild('floatingpais') floatingpais: ElementRef | null = null;
  public paises: Pais[] = [];
  public ciudades: Ciudad[] = [];
  public provincias: Estado[] = [];

  // ID de la comsision a editar
  getId: any;


  public isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos nuevos
  public files: any[] = [];
  public archivos = [1];

  // Documentos Actuales
  public docsBorrar: any = [];
  public documentosArray: any = [];

  private pais: Pais = {
    id: 0,
    name: '',
    iso2: ''
  };
  private provincia: Estado = {
    id: 0,
    name: '',
    iso2: '',
  }




  // ------------ CONSTRUCTOR ---------------
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private datepipe: DatePipe,

    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,

    private comisionSvc: ComisionesService,
    private tipoComisionSvc: TipoComisionService,
    private loaderSvc: LoaderService,
    private paisesCiudadesSvc: PaisesCiudadesService
  ) {

    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.tiposComision$ = this.tipoComisionSvc.getTipoSolicitud();

    this.editarComisionForm = this.formBuilder.group({
      tipos_comision_id: ['', [Validators.required, Validators.nullValidator]],
      justificacion: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(350)]],
      idioma: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      pais: ['', [Validators.required]],
      provincia: [''],
      ciudad: [''],
    });

    this.fromDate = null;

  }



  ngOnInit(): void {

    // Trae los valores actuales de la comisión
    this.comisionSvc.getComision(this.getId).subscribe({
      next: (res) => {
        this.editarComisionForm.setValue({
          tipos_comision_id: Number(res.tipos_comision.id),
          justificacion: res.justificacion,
          idioma: res.idioma,
          pais: res.lugar?.split(",")[0],
          provincia: res.lugar?.split(",")[1] ? res.lugar?.split(",")[1] : "",
          ciudad: res.lugar?.split(",")[2] ? res.lugar?.split(",")[2] : "",
          fecha_inicio: this.datepipe.transform(res.fecha_inicio, 'YYYY-MM-dd'),
          fecha_fin: this.datepipe.transform(res.fecha_fin, 'YYYY-MM-dd')
        });

        res.documentos.forEach((documento: any) => this.documentosArray.push(documento))
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          //this.loading = false;
        }
      },
    });

    this.paisesCiudadesSvc.getPaises().subscribe(
      (data: Pais[]) => {
        this.paises = data;
      }
    )

  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.editarComisionForm.controls;
  }

  // --------------------------------------
  // ----------- TIPO DE SOLICITUD ---------
  // --------------------------------------
  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
  }


  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------

  inRange(fecha_1: any, fecha_2: any) {
    fecha_1 = new Date(this.formatter.format(fecha_1));
    fecha_2 = new Date(this.formatter.format(fecha_2));
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
      fecha_inicio: this.formatter.format(this.fromDate),
      fecha_fin: this.formatter.format(this.toDate)

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

  onUpload(event: Event, index: number) {

    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
    console.log(this.files);
  }


  removeFile(index: number) {
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
    };
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }



  isInvalidForm(controlName: string) {
    return this.editarComisionForm.get(controlName)?.invalid && this.editarComisionForm.get(controlName)?.touched;
  }


  borrarDocActual(idDoc: number, index: number) {

    // Si elimina documentos que ya están asociados a la comision
    if (this.documentosArray.length >= 1) {
      this.documentosArray.splice(index, 1);
    };

    // array de documentos que se borrarán y serán parámetros en el service
    this.docsBorrar.push(idDoc);
  }


  // --------------------------------------
  // -------- LUGAR - PAISES - CIUDAD -----
  // --------------------------------------

  onChangePais(event: any) {
    const paisId = event.target.value;
    this.pais = this.paises[paisId];
    this.paisesCiudadesSvc.getEstados(this.pais).subscribe(
      (data: Estado[]) => {
        this.provincias = data;
      }
    )
  }

  onChangeProvincia(event: any) {
    const estadoId = event.target.value;
    this.provincia = this.provincias[estadoId];
    this.paisesCiudadesSvc.getCiudades(this.pais, this.provincia).subscribe(
      (data: Ciudad[]) => {
        this.ciudades = data;
      }
    );
  }


  // ----------------------------------------
  // ----------- EDITAR COMISION ------------
  // ----------------------------------------
  onUpdate(): any {

    // Convertir el id del tipo de comision: de string a numero
    this.editarComisionForm.value.tipo_comision_id = Number(this.editarComisionForm.value.tipo_comision_id);  // the + operator will change the type to number
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.editarComisionForm.invalid) {
      console.log('invalid form')
      return;
    }

    // Convierte los strings a fechas en UTC, y se remueve GMT 
    let fecha_inicio = new Date(this.editarComisionForm.value.fecha_inicio).toUTCString().slice(0, -4);
    let fecha_fin = new Date(this.editarComisionForm.value.fecha_fin).toUTCString().slice(0, -4);


    // Se agregan las horas de diferencia 
    let fecha_inicio_utc = new Date(fecha_inicio).toUTCString()
    let fecha_fin_utc = new Date(fecha_fin).toUTCString()

    const body = {
      fecha_inicio: fecha_inicio_utc,
      fecha_fin: fecha_fin_utc,
      fecha_resolucion: new Date(this.formatter.format(this.today)),
      justificacion: this.editarComisionForm.value.justificacion,
      idioma: this.editarComisionForm.value.idioma,
      lugar: this.pais.name + ', ' + this.provincia.name,
      tipos_comision_id: this.editarComisionForm.value.tipos_comision_id
    }

    // crea un body con los datos y los archivos
    const reqBody: FormData = new FormData();
    reqBody.append('tipos_comision_id', body.tipos_comision_id);
    reqBody.append('fecha_inicio', body.fecha_inicio);
    reqBody.append('fecha_fin', body.fecha_fin);
    reqBody.append('justificacion', body.justificacion);
    reqBody.append('idioma', body.idioma);
    reqBody.append('lugar', body.lugar);

    for (const file of this.files) {
      reqBody.append('archivo', file, file.name)
    }


    // Edita la comision: ID de la comision, ID de documentos borrados, Form 
    this.comisionSvc.updateComision(this.getId, "[" + this.docsBorrar.toString() + "]",
      this.files, reqBody).subscribe({
        next: (res) => {

          //ngZone: facilitate change detection
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/comisiones/ver-comision/${this.getId}`)
          );
          Swal.fire({
            title: 'Actualizada',
            text: '¡La comisión se actualizó con éxito!',
            icon: 'success',
            confirmButtonColor: '#3AB795',
          });
        },
        error: (err) => {
          if (err.status === 404 || err.status === 401) {
            this.error = err.error.msg;
          }
        },
      });


  }

}

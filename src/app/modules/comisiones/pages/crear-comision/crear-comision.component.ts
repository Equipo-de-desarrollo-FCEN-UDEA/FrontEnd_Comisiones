import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

// --------- SERVICIOS E INTERFACES ---------
import { DiasHabiles } from '@shared/clases/dias-habiles';
import { PaisesCiudadesService } from '@services/paises-ciudades.service';
import { Ciudad, Pais, Estado } from '@interfaces/paises-ciudades';
import { TipoComisionService } from '@services/comisiones/tipo-comision.service';
import { TipoComision } from '@interfaces/tipos_comision';
import { ComisionesService } from '@services/comisiones/comisiones.service';
import { LoaderService } from '@services/interceptors/loader.service';



@Component({
  selector: 'app-crear-comision',
  templateUrl: './crear-comision.component.html',
  styleUrls: ['./crear-comision.component.scss']
})
export class CrearComisionComponent implements OnInit {

  creaComisionForm: FormGroup;

  // Fechas
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  public dias_permiso = 15;
  today = this.calendar.getToday();

  // Archivos 
  files : any[]=[];

  archivos = [1];

  // Lugar

  private pais : Pais={
    id: 0,
    name: '',
    iso2: ''
  };
  private provincia : Estado = {
      id: 0,
      name: '',
      iso2: '',
  }

  @ViewChild('floatingpais') floatingpais: ElementRef | null = null;
  public paises: Pais[]=[];
  public ciudades: Ciudad[]=[];
  public provincias: Estado[]=[];


  // Tipos de comision desde back
  tiposComision$: Observable<TipoComision[]>;

  // Loader
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Verificaciones
  clicked = 0;
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private calendar : NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngZone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef,

    private tipoComisionSvc: TipoComisionService,
    private comisionesSvc: ComisionesService,
    private loaderSvc: LoaderService,
    private paisesCiudadesSvc: PaisesCiudadesService
  ) { 

  // -------- OBTENER TIPOS SOLICITUD --------
  this.tiposComision$ = this.tipoComisionSvc.getTipoSolicitud();

  // ------------- FORM CREAR COMISION -------------
  this.creaComisionForm = this.formBuilder.group({
    tipos_comision_id: ['', [Validators.required, Validators.nullValidator]],
    fecha_inicio : ['', [Validators.required]],
    fecha_fin : ['',[Validators.required]],
    justificacion : ['', [Validators.required, Validators.minLength(30),Validators.maxLength(350)]],
    idioma : ['', Validators.maxLength(255)],
    pais : ['', [Validators.required]],
    provincia: [''],
    ciudad : [''],
  });

    this.fromDate = null;
    this.toDate = null;
  }

  ngOnInit(): void {
     this.paisesCiudadesSvc.getPaises().subscribe(
      (data:Pais[]) => {
        this.paises = data;
      }
     )
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
    return DiasHabiles(fecha_1, fecha_2) > this.dias_permiso;
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

    this.creaComisionForm.patchValue({
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
  // ----------- TIPO DE SOLICITUD ---------
  // --------------------------------------
  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
  }


  
  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.creaComisionForm.controls;
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
    return this.creaComisionForm.get(controlName)?.invalid && this.creaComisionForm.get(controlName)?.touched;
  }

  // --------------------------------------
  // -------- LUGAR - PAISES - CIUDAD -----
  // --------------------------------------

  onChangePais(event:any) {
    const paisId = event.target.value;
    this.pais = this.paises[paisId];
    this.paisesCiudadesSvc.getEstados(this.pais).subscribe(
      (data:Estado[]) => {
        this.provincias = data;
      }
    )
  }

  onChangeEstado(event:any) {
    const estadoId = event.target.value;
    this.provincia = this.provincias[estadoId];
    this.paisesCiudadesSvc.getCiudades(this.pais, this.provincia).subscribe(
      (data:Ciudad[]) => {
        this.ciudades = data;
      }
    );
  }

 // ----------------------------------------
 // ----------- CREAR COMISION ------------
 // ----------------------------------------
  onSubmit() {

    this.submitted = true;
    
    // Se detiene aqui si el formulario es invalido
    if (this.creaComisionForm.invalid) {
      console.log('invalid form')
      return;
    }
    
    const body = {
      fecha_inicio: this.creaComisionForm.value.fecha_inicio,
      fecha_fin: this.creaComisionForm.value.fecha_fin,
      fecha_resolucion: new Date(this.formatter.format(this.today)),
      justificacion: this.creaComisionForm.value.justificacion,
      idioma: this.creaComisionForm.value.idioma,
      lugar:this.pais.name+', '+this.provincia.name,
      tipos_comision_id: this.creaComisionForm.value.tipos_comision_id
    }


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
    
    this.comisionesSvc.postComision(reqBody).subscribe({
      next: (res) => { 
        Swal.fire({
          title: 'Creada',
          text: '¡La comisión se creó con éxito!',
          icon: 'success',
          confirmButtonColor: '#3AB795',
        });
        //ngZone: facilitate change detection
        this.ngZone.run(() =>
          this.router.navigateByUrl(`/home`)
        );
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      }
    });
  }
  
}
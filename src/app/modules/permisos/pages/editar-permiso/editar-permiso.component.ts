import { ChangeDetectorRef, Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@services/interceptors/loader.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { DiasHabiles } from '@shared/clases/dias-habiles';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// ----------- SERVICIOS ------------
import { TiposPermiso, TiposPermisoInside } from '@interfaces/tipos_permiso';
import { PermisoService } from '@services/permisos/permiso.service';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss']
})
export class EditarPermisoComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  today = this.calendar.getToday();

  editarPermisoForm: FormGroup;
  error = '';

  // ID de la comsision a editar
  getId: any;

  submitted = false;
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos nuevos
  files : any[]=[];
  archivos = [1];

  // Documentos Actuales
  docsBorrar:any = [];
  documentosArray:any = [];


  public tipospermiso = [
    {id: 1, nombre: 'Permiso por matrimonio'},
    {id: 2, nombre: 'Permiso corto'},
    {id: 3, nombre: 'Permiso de medio dia de la jornada por cumpleaños'},
    {id: 4, nombre: 'Licencia de maternidad'},
    {id: 5, nombre: 'Licencia de patermidad'},
    {id: 6, nombre: 'Licencia de calamiad domestica'},
    {id: 7, nombre: 'Licencia no remunerada'},
    {id: 8, nombre: 'Licencia de luto'}
  ]


  clicked = 0;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private datepipe: DatePipe,
    //private pipeTransform: PipeTransform,

    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    
    private permisoSvc: PermisoService,
    private loaderSvc: LoaderService,
    
    private activateRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router
  ) {

    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    // Trae los valores actuales de la comisión
    this.permisoSvc.getPermiso(this.getId).subscribe({
      next: (res) => {
        this.editarPermisoForm.setValue({
          tipos_permiso_id: Number(res.tipos_permiso.id),
          justificacion: res.justificacion,
          fecha_inicio: this.datepipe.transform(res.fecha_inicio, 'YYYY-MM-dd'),
          fecha_fin: this.datepipe.transform(res.fecha_fin, 'YYYY-MM-dd')
        });

        res.documentos.forEach((documento: any) => this.documentosArray.push(documento)) 

        console.log(res);
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          //this.loading = false;
        }
      },
    });

    this.editarPermisoForm = this.formBuilder.group({
      tipos_permiso_id: ['', [Validators.required, Validators.nullValidator]],
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
  
      return this.editarPermisoForm.controls;
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
      this.editarPermisoForm.patchValue({
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
      return this.editarPermisoForm.get(controlName)?.invalid && this.editarPermisoForm.get(controlName)?.touched;
    }
  
    
    borrarDocActual(idDoc: number, index: number){
  
      // Si elimina documentos que ya están asociados a la permiso
      if (this.documentosArray.length >= 1) {
        this.documentosArray.splice(index, 1);
        };
  
      // array de documentos que se borrarán y serán parámetros en el service
      this.docsBorrar.push(idDoc);
    }


 // ----------------------------------------
 // ----------- EDITAR PERMISO ------------
 // ----------------------------------------
 onUpdate(): any {

  // Convertir el id del tipo de permiso: de string a numero
  this.editarPermisoForm.value.tipo_permiso_id = Number(this.editarPermisoForm.value.tipo_permiso_id);  // the + operator will change the type to number
  this.submitted = true;

  // Se detiene aqui si el formulario es invalido
  if (this.editarPermisoForm.invalid) {
    console.log('invalid form')
    return;
  }

  const body = {
    fecha_inicio: this.editarPermisoForm.value.fecha_inicio,
    fecha_fin: this.editarPermisoForm.value.fecha_fin,
    fecha_resolucion: new Date(this.formatter.format(this.today)),
    justificacion: this.editarPermisoForm.value.justificacion,
    idioma: this.editarPermisoForm.value.idioma,
    lugar:this.editarPermisoForm.value.lugar,
    tipos_permiso_id: this.editarPermisoForm.value.tipos_permiso_id
  }


  console.log(body)

  const reqBody: FormData = new FormData();
  reqBody.append('tipos_permiso_id', body.tipos_permiso_id);
  reqBody.append('fecha_inicio', body.fecha_inicio);
  reqBody.append('fecha_fin', body.fecha_fin);
  reqBody.append('justificacion', body.justificacion);
  reqBody.append('idioma', body.idioma);
  reqBody.append('lugar', body.lugar);

  for (const file of this.files) {
    reqBody.append('archivo', file, file.name) 
  }
  

  // Edita la permiso: ID de la permiso, ID de documentos borrados, Form 
  this.permisoSvc.updatePermiso(this.getId, "["+this.docsBorrar.toString()+"]", 
    this.files, reqBody).subscribe({
      next: (res) => { 
        
        //facilitate change detection
        // this.ngZone.run(() =>
        //   this.router.navigateByUrl(`/permisos/ver-permiso/${this.getId}`)
        // );
        Swal.fire({
          title: 'Actulizada',
          text: '¡El permiso se actualizó con éxito!',
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

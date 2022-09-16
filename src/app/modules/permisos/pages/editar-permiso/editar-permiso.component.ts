
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
import { TipoPermisoService } from '@services/permisos/tipo-permiso.service';
import { ReturnStatement } from '@angular/compiler';


@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss']
})
export class EditarPermisoComponent implements OnInit {


  error = '';
  clicked = 0;
  submitted = false;
  
  diaHabil: number = 0;
  // Datepicker
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  today = this.calendar.getToday();

  // ID de la comsision a editar
  getId: any;

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos nuevos
  files: any[] = [];
  archivos = [1];

  // Documentos Actuales
  docsBorrar: any = [];
  documentosArray: any = [];

  // Tipos Permiso
  tiposPermiso$: Observable<TiposPermiso[]>;

  // Form permiso
  editarPermisoForm: FormGroup;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private datepipe: DatePipe,

    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,

    private permisoSvc: PermisoService,
    private loaderSvc: LoaderService,
    private tiposPermisoSvc: TipoPermisoService,

    private activateRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router
  ) {

    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    // Tipos de permiso
    this.tiposPermiso$ = this.tiposPermisoSvc.getTiposPermiso();

    // Form permiso
    this.editarPermisoForm = this.formBuilder.group({
      tipos_permiso_id: ['', [Validators.required, Validators.nullValidator]],
      justificacion: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(350)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });

    this.fromDate = null;

    this.permisoSvc.getPermiso(this.getId).subscribe({
      next: (res) => {
        this.editarPermisoForm.setValue({
          tipos_permiso_id: Number(res.tipos_permiso.id),
          justificacion: res.justificacion,
          fecha_inicio: this.datepipe.transform(res.fecha_inicio, 'YYYY-MM-dd'),
          fecha_fin: this.datepipe.transform(res.fecha_fin, 'YYYY-MM-dd')
        });

        this.tiposPermisoSvc.getTipoPermisoId(res.tipo_permiso_id.id).subscribe({
          next: (res) => {
            this.diaHabil = res.dias;
          },
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

  inRange(fecha_1: any, fecha_2: any) {
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
    } else if (this.fromDate && !this.toDate && date) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.editarPermisoForm.patchValue({
      fecha_inicio: this.formatter.format(this.fromDate),
      fecha_fin: this.formatter.format(this.toDate)
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  selectDias(fromDate: NgbDate | null, toDate: NgbDate | null):boolean {
    if (fromDate || toDate) {
      return DiasHabiles(new Date(this.formatter.format(fromDate)),new Date( this.formatter.format(toDate))) > this.diaHabil
    } else {
      return false
    }
  }

  isHoveredInvalid(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      this.selectDias(this.fromDate, this.hoveredDate) &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
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

  validTipoArchivo() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }

  isInvalidForm(controlName: string) {
    return this.editarPermisoForm.get(controlName)?.invalid && this.editarPermisoForm.get(controlName)?.touched;
  }


  borrarDocActual(idDoc: number, index: number) {

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


    // Convierte los strings a fechas en UTC, y se remueve GMT 
    let fecha_inicio = new Date(this.editarPermisoForm.value.fecha_inicio).toUTCString().slice(0, -4);
    let fecha_fin = new Date(this.editarPermisoForm.value.fecha_fin).toUTCString().slice(0, -4);


    // Se agregan las horas de diferencia 
    let fecha_inicio_utc = new Date(fecha_inicio).toUTCString()
    let fecha_fin_utc = new Date(fecha_fin).toUTCString()


    const reqBody: FormData = new FormData();
    reqBody.append('tipos_permiso_id', this.editarPermisoForm.value.tipos_permiso_id);
    reqBody.append('fecha_inicio', fecha_inicio_utc);
    reqBody.append('fecha_fin', fecha_fin_utc);
    reqBody.append('justificacion', this.editarPermisoForm.value.justificacion);

    for (const file of this.files) {
      reqBody.append('archivo', file, file.name)
    }


    // Edita la permiso: ID de la permiso, ID de documentos borrados, Form 
    this.permisoSvc.updatePermiso(this.getId, "[" + this.docsBorrar.toString() + "]",
      this.files, reqBody).subscribe({
        next: (res) => {

          //facilitate change detection
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/permisos/ver-permiso/${this.getId}`)
          );
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
          if (err.status === 400) {
            this.error = err.error.message;
          }
        },
      });


  }

}

import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
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

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss'],
})
export class EditarPermisoComponent implements OnInit {
  public error = '';
  public clicked = 0;
  public submitted = false;

  public diaHabil: number = 0;
  // Datepicker
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // ID de la comsision a editar
  public getId: any;

  public isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos nuevos
  public files: any[] = [];
  public archivos = [1];

  // Documentos Actuales
  public docsBorrar: any = [];
  public documentosArray: any = [];

  // Tipos Permiso
  public tiposPermiso$: Observable<TiposPermiso[]>;

  // Form permiso
  public editarPermisoForm: FormGroup;

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
      justificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(350),
        ],
      ],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    });

    this.fromDate = null;

    this.permisoSvc.getPermiso(this.getId).subscribe({
      next: (res) => {
        this.editarPermisoForm.setValue({
          tipos_permiso_id: Number(res.tipos_permiso.id),
          justificacion: res.justificacion,
          fecha_inicio: this.datepipe.transform(res.fecha_inicio, 'YYYY-MM-dd'),
          fecha_fin: this.datepipe.transform(res.fecha_fin, 'YYYY-MM-dd'),
        });

        this.tiposPermisoSvc
          .getTipoPermisoId(res.tipo_permiso_id)
          .subscribe({
            next: (res) => {
              this.diaHabil = res.dias;
            },
          });

        res.documentos.forEach((documento: any) =>
          this.documentosArray.push(documento)
        );
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          //this.loading = false;
        }
      },
    });
  }

  ngOnInit(): void {}

  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {
    return this.editarPermisoForm.controls; //accede a los form
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
      fecha_fin: this.formatter.format(this.toDate),
    });
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  selectDias(fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    if (fromDate || toDate) {
      return (
        DiasHabiles(
          new Date(this.formatter.format(fromDate)),
          new Date(this.formatter.format(toDate))
        ) > this.diaHabil
      );
    } else {
      return false;
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

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const PARSED = this.formatter.parse(input);
    return PARSED && this.calendar.isValid(NgbDate.from(PARSED))
      ? NgbDate.from(PARSED)
      : currentValue;
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event: Event, index: number) {
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      this.files.splice(index, 1, FILE);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
    }
    this.files.splice(index, 1);
  }

  //verifica el tamaño de los archivos que se van a adjuntar al permiso, max:2MB
  validSize() {
    const SIZE = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return SIZE < 2 * 1024 * 1024;
  }

  //verifica que el archivo a adjuntar sea de un tipo valido
  validTipoArchivo() {
    const EXTENSIONES_VALIDAS = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    let flag;
    this.files.forEach((file) => {
      flag = EXTENSIONES_VALIDAS.includes(
        file.name.split('.')[file.name.split('.').length - 1]
      ); //separa el ultimo punto del nombre del archivo para verificar su tipo
    });
    return flag;
  }

  isInvalidForm(controlName: string) {
    return (
      this.editarPermisoForm.get(controlName)?.invalid &&
      this.editarPermisoForm.get(controlName)?.touched
    );
  }

  borrarDocActual(idDoc: number, index: number) {
    // Si elimina documentos que ya están asociados a la permiso
    if (this.documentosArray.length >= 1) {
      this.documentosArray.splice(index, 1);
    }

    // array de documentos que se borrarán y serán parámetros en el service
    this.docsBorrar.push(idDoc);
  }

  // ----------- TIPOS DE PERMISOS ------------

  onTipoDePermiso(event: any) {
    const idTipoPermiso = event;

    this.tiposPermisoSvc.getTipoPermisoId(idTipoPermiso).subscribe({
      next: (res) => {
        this.diaHabil = res.dias;
      },
    });
  }

  // ----------------------------------------
  // ----------- EDITAR PERMISO ------------
  // ----------------------------------------
  onUpdate(): any {
    // Convertir el id del tipo de permiso: de string a numero
    this.editarPermisoForm.value.tipo_permiso_id = Number(
      this.editarPermisoForm.value.tipo_permiso_id
    ); // the + operator will change the type to number
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.editarPermisoForm.invalid) {
      return;
    }

    // Convierte los strings a fechas en UTC, y se remueve GMT
    let fecha_inicio = new Date(this.editarPermisoForm.value.fecha_inicio)
      .toUTCString()
      .slice(0, -4);
    let fecha_fin = new Date(this.editarPermisoForm.value.fecha_fin)
      .toUTCString()
      .slice(0, -4);

    // Se agregan las horas de diferencia
    let fecha_inicio_utc = new Date(fecha_inicio).toUTCString();
    let fecha_fin_utc = new Date(fecha_fin).toUTCString();

    const REQ_BODY: FormData = new FormData();
    REQ_BODY.append(
      'tipos_permiso_id',
      this.editarPermisoForm.value.tipos_permiso_id
    );
    REQ_BODY.append('fecha_inicio', fecha_inicio_utc);
    REQ_BODY.append('fecha_fin', fecha_fin_utc);
    REQ_BODY.append(
      'justificacion',
      this.editarPermisoForm.value.justificacion
    );

    for (const FILE of this.files) {
      REQ_BODY.append('archivo', FILE, FILE.name);
    }

    // Edita la permiso: ID de la permiso, ID de documentos borrados, Form
    this.permisoSvc
      .updatePermiso(
        this.getId,
        '[' + this.docsBorrar.toString() + ']',
        this.files,
        REQ_BODY
      )
      .subscribe({
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

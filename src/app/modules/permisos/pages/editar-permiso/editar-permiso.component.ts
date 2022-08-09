import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisosDTO } from '@interfaces/permisos';
import { TiposPermiso } from '@interfaces/tipos_permiso';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PermisoService } from '@services/permiso.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss']
})
export class EditarPermisoComponent implements OnInit {

  getId: any;
  loading = false;
  submitted = false;
  error = '';
  files :any[] = [];
  archivos = [1];
  clicked = 0
  hoveredDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  today = this.calendar.getToday();
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  permiso: PermisosDTO | undefined;
  updatePermiso!: FormGroup;
  options$: Observable<TiposPermiso[]> | undefined;

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

   constructor(
    private permisoService:PermisoService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private calendar : NgbCalendar,
    private fb: FormBuilder,
    public formatter: NgbDateParserFormatter,
   ) {
    
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
  //  this.permisoService.getPermiso(this.getId).subscribe({
  //   next: (res) => {
  //     this.updatePermiso.setValue({
  //       tipos_permisos: res.tipos_permisos.nombre,
  //       justificacion: res.justificacion,
  //     });
  //   },
  //   error: (err) => {
  //     if (err.status === 404 || err.status === 401) {
  //       this.error = err.error.msg; // mensaje desde el back
  //       this.loading = false;
  //     }
  //   },
  // });

    this.updatePermiso = this.formBuilder.group({
      tipos_permisos: [''],
      justificacion: ['', Validators.required],

    });
    }

    ngOnInit(): void {
    this.fromDate = null;
    this.toDate = null;
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
    this.formPermiso.patchValue({
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

  formPermiso = this.fb.group({
    fecha_inicio : ['', [Validators.required]],
    fecha_fin : ['',[Validators.required]],
    justificacion : ['', [Validators.required,Validators.minLength(30),Validators.maxLength(350)]],
    tipos_permiso_id : [0,[Validators.required,Validators.min(1),Validators.max(this.tipospermiso.length)]]});


   

   get f() {
    return this.updatePermiso.controls;
  }

  onUpload(id: any): any {
    this.submitted = true;

    // stop here if form is invalid

    if (this.updatePermiso.invalid) {
      return;
    }
      this.permisoService
      .updateSolicitud(this.getId, this.updatePermiso.value)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() =>
            this.router.navigateByUrl(`/permisos/ver-permisos/${this.getId}`)
          );
          Swal.fire({
            title: 'Actulizada',
            text: '¡El Permiso se actualizó con éxito!',
            icon: 'success',
            confirmButtonColor: '#3AB795',
          });
        },
        error: (err) => {
          if (err.status === 404 || err.status === 401) {
            this.error = err.error.msg;
            this.loading = false;
          }
        },
      });
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
    return this.formPermiso.get(controlName)?.invalid && this.formPermiso.get(controlName)?.touched;
  }

}

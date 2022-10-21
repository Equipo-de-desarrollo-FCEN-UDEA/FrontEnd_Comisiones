import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '@interfaces/estados';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComisionxestadoService } from '@services/comisiones/comisionesxestado.service';
import { DedicacionxestadoService } from '@services/dedicaciones/dedicacionxestado.service';
import { EstadosService } from '@services/estados.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { Subject, Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosDedicacionComponent {

  asociarEstadoForm: FormGroup;

  model!: NgbDateStruct;
  // ID de la comsision a editar
  getId: any;
  urlId: any;

  files: any[] = [];
  archivos = [1];

  submitted = false;
  error = ''

  // Loader
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  // Estados
  nuevoEstado$: Observable<Estado[]>;


  constructor(
    private dedicacionxEstadoSvc: DedicacionxestadoService,

    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private dedicacionSvc: DedicacionService,
    private loaderService: LoaderService,
    private estadosSvc: EstadosService
  ) {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.nuevoEstado$ = this.estadosSvc.getEstados();

    this.asociarEstadoForm = this.formBuilder.group({
      fecha_inicio: ['', [Validators.required]],
      fecha_informe: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]]
    });
  }



  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {

    return this.asociarEstadoForm.controls;
  }

  onUpload(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
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

  asociarEstado() {
    let fecha_fin = this.asociarEstadoForm.value.fecha_fin
    fecha_fin = new Date(fecha_fin.year, fecha_fin.month, fecha_fin.day)
    let fecha_inicio = this.asociarEstadoForm.value.fecha_inicio
    fecha_inicio = new Date(fecha_inicio.year, fecha_inicio.month, fecha_inicio.day)
    let fecha_informe = this.asociarEstadoForm.value.fecha_informe
    fecha_informe = new Date(fecha_informe.year, fecha_informe.month, fecha_informe.day)
    // console.log(this.asociarEstadoForm.value)
    // console.log(fecha_fin, fecha_informe, fecha_inicio)
    this.dedicacionSvc.patchDedicacion(this.getId, { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, fecha_informe: fecha_informe }).subscribe({
      next: res => {
        Swal.fire({
          text: 'La dedicación se actualizó con éxito',
          icon: 'success'
        }).then(
          () => this.router.navigate(['../'])
        )
      },
      error: res => {
        Swal.fire({
          text: res.error.msg,
          icon: 'error'
        })
      }
    })
  }

}
  // this.submitted = true;

  // // Se detiene si el formulario es inválido
  // if (this.asociarEstadoForm.invalid) {
  //   return;
  // }

  // this.dedicacionxEstadoSvc.postDedicacionxEstado(this.getId, this.asociarEstadoForm.value)
  // .subscribe({
  //       next: (res) => {
  //         this.ngZone.run(() => this.router.navigate(['/home']));
  //         Swal.fire({
  //           title: 'Estado actualizado',
  //           text: '¡Se asoció el estado a la comisión con éxito!',
  //           icon: 'success',
  //           confirmButtonColor: '#3AB795',
  //         });
  //       },
  //       error: (err) => {
  //         if (err.status === 404 || err.status === 401) {
  //           this.error = err.error.msg;
  //         }
  //       },
  //     });





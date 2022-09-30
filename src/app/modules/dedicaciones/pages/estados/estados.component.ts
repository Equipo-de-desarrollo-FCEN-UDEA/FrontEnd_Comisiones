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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosDedicacionComponent {

  asociarEstadoForm: FormGroup;

  // ID de la comsision a editar
  getId: any;
  urlId: any;

  files : any[]=[];
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

    private loaderService: LoaderService,
    private estadosSvc: EstadosService
    ) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.nuevoEstado$ = this.estadosSvc.getEstados();

    this.asociarEstadoForm = this.formBuilder.group({
      estados_id: ['', [Validators.required, Validators.nullValidator]],
      observacion : ['']
    });
  }



  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {
  
    return this.asociarEstadoForm.controls;
  }

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

  validTipoArchivo() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }

  asociarEstado(){

    this.submitted = true;

    // Se detiene si el formulario es inválido
    if (this.asociarEstadoForm.invalid) {
      return;
    }

    this.dedicacionxEstadoSvc.postDedicacionxEstado(this.getId, this.asociarEstadoForm.value)
    .subscribe({
          next: (res) => {
            this.ngZone.run(() => this.router.navigate(['/home']));
            Swal.fire({
              title: 'Estado actualizado',
              text: '¡Se asoció el estado a la comisión con éxito!',
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

import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// --------- SERVICIOS E INTERFACES ---------
import { ComisionxestadoService } from '@services/comisiones/comisionesxestado.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { LoaderService } from '@services/interceptors/loader.service';
import { Estado } from '@interfaces/estados';
import { EstadosService } from '@services/estados.service';

@Component({
  selector: 'app-estados-comision',
  templateUrl: './estados-comision.component.html',
  styleUrls: ['./estados-comision.component.scss']
})
export class EstadosComisionComponent {

  asociarEstadoForm: FormGroup;

  // ID de la comsision a editar
  getId: any;
  urlId: any;

  submitted = false;
  error = ''

  // Loader
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  // Estados
  nuevoEstado$: Observable<Estado[]>;


  constructor(
    private comisionxEstadoSvc: ComisionxestadoService,

    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, 
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,

    private loaderService: LoaderService,
    private estadosSvc: EstadosService
    ) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.nuevoEstado$ = this.estadosSvc.getEstados();

    console.log('id en child ',this.getId);

    this.asociarEstadoForm = this.formBuilder.group({
      estados_id: ['', [Validators.required, Validators.nullValidator]],
      observacion : ['']
    });
  }



  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {
  
    return this.asociarEstadoForm.controls;
  }



  asociarEstado(){

    this.submitted = true;

    // Se detiene si el formulario es inválido
    if (this.asociarEstadoForm.invalid) {
      return;
    }

    this.comisionxEstadoSvc.postComisionxEstado(this.getId, this.asociarEstadoForm.value)
    .subscribe({
          next: (res) => {
            console.log(this.asociarEstadoForm.value)
            this.ngZone.run(() => this.router.navigate(['/home']));
            Swal.fire({
              title: 'Creada',
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



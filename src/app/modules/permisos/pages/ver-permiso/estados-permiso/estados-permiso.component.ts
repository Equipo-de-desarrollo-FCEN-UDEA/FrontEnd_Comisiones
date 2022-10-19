import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '@interfaces/estados';
import { EstadosService } from '@services/estados.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { PermisosXEstadoService } from '@services/permisos/permisos-xestado.service';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados-permiso',
  templateUrl: './estados-permiso.component.html',
  styleUrls: ['./estados-permiso.component.scss']
})
export class EstadosPermisoComponent implements OnInit {

  public asociarEstadoForm: FormGroup;

  // ID de la comsision a editar
  public getId: any;
  public urlId: any;

  public submitted = false;
  public error = ''

  // Loader
  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  // Estados
  public nuevoEstado$: Observable<Estado[]>;

  constructor(
    private formBuilder: FormBuilder, 
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,

    private permisoEstadoSvc: PermisosXEstadoService,
    private estadosSvc: EstadosService,
    private loaderService: LoaderService
    ) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.nuevoEstado$ = this.estadosSvc.getEstados();


    this.asociarEstadoForm = this.formBuilder.group({
      estados_id: ['', [Validators.required, Validators.nullValidator]],
      observacion : ['']
    });
  }


  ngOnInit(): void {
  }



  // ----------- MANEJO DE ERRORES EN EL FORM ------------
  get f() {
  
    return this.asociarEstadoForm.controls;
  }



  asociarEstado(){

    this.submitted = true;

    // stop here if form is invalid
    if (this.asociarEstadoForm.invalid) {
      return;
    }

    this.permisoEstadoSvc.postPermisoxEstado(this.getId, this.asociarEstadoForm.value)
    .subscribe({
          next: (res) => {
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

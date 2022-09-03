import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoInDB } from '@interfaces/departamentos';
import { Rol, RolResponse } from '@interfaces/roles';
import { DepartamentoService } from '@services/departamentos/departamento.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { RolService } from '@services/roles/rol.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { tiposId } from '@shared/data/tipos-id';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss']
})
export class RegistrarUsuariosComponent implements OnInit {

  crearUsuarioForm: FormGroup;

  tiposId = tiposId;
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/; //--> EL QUE SE USARÁ

  public loading:boolean = false;
  public error:string = "";
  public submitted:boolean = false;

  // Loader
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Departamentos 
  departamentos$: Observable<DepartamentoInDB[]>;


  // Roles 
  roles$: Observable<Rol[]>


  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router, 

    private loaderSvc: LoaderService,
    private usuarioSvc: UsuarioService,
    private departamentosSvc: DepartamentoService,
    private rolesSvc: RolService
  ) { 

    this.departamentos$ = this.departamentosSvc.getDepartamentos();
    this.roles$ = this.rolesSvc.getRoles();

    this.crearUsuarioForm = this.formBuilder.group({
      correo : ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
      contrasena : ['', Validators.required],
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      tipo_identificacion : ['', Validators.required],
      identificacion : ['', Validators.required],
      departamentos_id : ['', Validators.required],
      roles_id : ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }


  get f() {
    return this.crearUsuarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // verificacion de errores
    if (this.crearUsuarioForm.invalid) {
      return;
    }


    this.usuarioSvc.postUsuario(this.crearUsuarioForm.value).subscribe({
      next: (res:any) => { 
        Swal.fire({
          title: 'Creado',
          text: res.message,
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

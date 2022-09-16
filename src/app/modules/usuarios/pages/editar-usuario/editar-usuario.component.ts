import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Rol } from '@interfaces/roles';
import { UsuarioResponse, Usuario } from '@interfaces/usuario';
import { DepartamentoService } from '@services/departamentos/departamento.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { RolService } from '@services/roles/rol.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { tiposId } from '@shared/data/tipos-id';
import { Observable, take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})

export class EditarUsuarioComponent implements OnInit {
  public usuario!: Usuario;
  public usuarioResponse : UsuarioResponse | undefined;

  public tiposId = tiposId;
  public isLoading = this.loadingSvc.isLoading;
  public error: string = "";
  public submitted: boolean = false;
  public rol: string = localStorage.getItem('rol') || '';
  public roles$: Observable<Rol[]>
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;
  public getId: Number | string = 0;


  constructor(
    private usuarioSvc: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    public usuarioService: UsuarioService,
    public loadingSvc: LoaderService,
    private departamentosSvc: DepartamentoService,
    private rolesSvc: RolService
  ) {
    this.roles$ = this.rolesSvc.getRoles();
    this.activateRoute.params.pipe(take(1)).subscribe(params => this.getId = params['id']);
    this.usuarioSvc.getUsuariobyId(this.getId as number).subscribe({
      next: res => {
        this.usuarioResponse = res;
        this.formUpdate.patchValue(this.usuarioResponse);
      },
      error: (err) => {
        console.log(err.status);
        if (err.status == 401) {
          Swal.fire({
            title: 'No autorizado',
            text: 'No estás autorizado para ver este sitio',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then(() => this.router.navigate(['/']));
        }
      }
    }
    );
  }
  formUpdate = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
    nombre: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    apellido: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    tipo_identificacion: ['', [Validators.maxLength(250)]],
    identificacion: [' ', [Validators.required, Validators.min(1000), Validators.max(999999999999)]],
    telefono: ['', [Validators.required]],
    oficina: ['', [Validators.required]],
    tipo_vinculacion: ['', [Validators.required]],
    departamentos_id : ['', Validators.required],
    // contrasena: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(250)]],
    // validarcontrasena: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(250)]],
    roles_id: [NaN, Validators.required]
  });

  ngOnInit(): void {

   
  }

  get f() {
    return this.formUpdate.controls;
  }

  submitUpdate() {
    this.submitted = true;
    const usuario = this.formUpdate.value;
    console.log(this.formUpdate.value);
    this.usuarioSvc.updateUsuario({ id: this.getId, ...usuario }).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Usuario actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['usuarios/ver-usuario', this.getId])
        })
      },
      error: (err: any) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
        if (err.status === 400) {
          this.error = err.error.message;
        }
      }
    }
    );
  }
}

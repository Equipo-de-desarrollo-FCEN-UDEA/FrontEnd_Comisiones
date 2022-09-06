import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@interfaces/usuario';
import { AuthService } from '@services/auth/auth.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contrasena',
  templateUrl: './editar-contrasena.component.html',
  styleUrls: ['./editar-contrasena.component.scss']
})
export class EditarContrasenaComponent implements OnInit {

  public usuario!: Usuario;
  public id: Number | string = 0;

  public error: string = "";
  public loading: boolean = false;
  public submitted: boolean = false;


  public editarContrasenaForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authSvc : AuthService
  ) {
    this.activateRoute.params.pipe(take(1)).subscribe(params => this.id = params['id']);

    this.editarContrasenaForm = this.formBuilder.group({
      contrasena_actual: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      contrasena_expected_1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      contrasena_expected_2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (params) => {
        this.usuarioService.getUsuario().subscribe((resUsuario) => {
          this.usuario = resUsuario;
        });
      }
    });
  }
  get passwordMatchError() {
    return (
      this.editarContrasenaForm.getError('mismatch') &&
      this.editarContrasenaForm.get('contrasena_expected_2')?.touched
    );
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.editarContrasenaForm.controls;
  }

  isInvalidForm(controlName: string) {
    return this.editarContrasenaForm.get(controlName)?.invalid && this.editarContrasenaForm.get(controlName)?.touched;
  }

  ValidatePasswords() {
    return this.editarContrasenaForm.get('contrasena_expected_2')?.touched && this.editarContrasenaForm.get('contrasena_expected_1')?.value != this.editarContrasenaForm.get('contrasena_expected_2')?.value
  }

  submit(){
    console.log('asd')
    this.authSvc.cambiarContrasena(this.editarContrasenaForm.get('contrasena_actual')?.value, this.editarContrasenaForm.get('contrasena_expected_2')?.value).subscribe({
       next: (res : any) => {
        Swal.fire({
          title: 'Cambio de contraseña exitoso',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }
        ).then(() => {
          this.router.navigate(['/']);
        })
      },
      error: (err : any) => {
        Swal.fire({
          title: 'Algo salío mal, intenta de nuevo',
          text: err.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

    }
  });
  }

}
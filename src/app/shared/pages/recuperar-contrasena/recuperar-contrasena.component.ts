import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from '@services/interceptors/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    error = "";

    // Loader
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderSvc: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.f['correo'].value).subscribe({
      next: (res:any) =>{
        Swal.fire({
          title: 'Una nueva contraseña fue enviada al correo electrónico'+ this.f['correo'].value,
          text: res.message,
          icon: 'success',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar'
        }
        )
      },
      error: (err:any) => {
        Swal.fire({
          title: 'Algo ocurrió mal',
          text: err.message,
          icon: 'error',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar'
      })
    }}
    )

  }


}

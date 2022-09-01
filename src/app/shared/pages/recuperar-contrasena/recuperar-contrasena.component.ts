import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { LoaderService } from '@services/interceptors/loader.service';

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
      next: (res) => {
        this.router.navigate(['/home']);
        Swal.fire({
          title: 'Enviado!',
          text: '¡Revise el correo ingresado!',
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

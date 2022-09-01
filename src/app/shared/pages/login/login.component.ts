import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioAuth } from '@interfaces/usuario';
import { AuthService } from '@services/auth/auth.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public isCollapsed=true;
  // public tiposId=[
  //   'Cedula de Ciudadania',
  //   'Cedula de Extranjeria',
  //   'Pasaporte',
  //   'Tarjeta de Identidad',
  //   'Diplomatico',
  //   'Doc. Ident. De Extranjeros',
  //   'Ident. Fiscal. Para Ext.',
  //   'NIT',
  //   'NIT Persona Natural',
  //   'NUIP',
  //   'Registro Civil',
  //   'Certificado Nacido Vivo',
  //   'Pasaporte ONU',
  //   'Permiso especial de permanencia',
  //   'Salvoconducto de permanencia',
  //   'Permiso especial formacion PEPFF',
  //   'Permiso por protección temporal'
  // ]


  // public roles = [
  //   {
  //     id: 5,
  //     nombre: 'Empleado'
  //   },
  //   {
  //     id: 6,
  //     nombre: 'Profesor'
  //   },
  //   {
  //     id: 7,
  //     nombre: 'Estudiante'
  //   }
  // ]

  // public deparmentos = [
  //   {
  //     id: 1,
  //     nombre: 'Vicedecanatura FCEN'
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Extensión'
  //   }
  // ]


  // private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/; --> EL QUE SE USARÁ
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@gmail.com$/ ; 
  isLoading: Subject<boolean> = this.loadingService.isLoading;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoaderService
  ) { }
    
  formLogin = this.fb.group({

    correoLogin : ['', [Validators.required
      // , Validators.pattern(this.isCorreoValid)
    ]],

    passwordLogin : ['', Validators.required]
  });


  // formSignup = this.fb.group({
  //   correoSignup : ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
  //   passwordSignup : ['', Validators.required],
  //   nombreSignup : ['', Validators.required],
  //   apellidoSignup : ['', Validators.required],
  //   tipoIdSignup : ['', Validators.required],
  //   identificacionSignup : ['', Validators.required],
  //   departamentoSignup : ['', Validators.required],
  //   rolSignup : ['', Validators.required]
  // });

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }

  // click(){
  //   this.isCollapsed = !this.isCollapsed;
  //   console.log(this.isCollapsed)
  // }

  get f() {
    return this.formLogin.controls;
  }

  onSubmitLogin(){
    const user : UsuarioAuth ={
      correo: this.formLogin.value.correoLogin || '',
      contrasena: this.formLogin.value.passwordLogin || ''
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    this.authService.login(user).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          if (err.status === 404 || err.status === 401) {
            this.error = err.error.msg;
          }
        },
      }
    )
  }
}

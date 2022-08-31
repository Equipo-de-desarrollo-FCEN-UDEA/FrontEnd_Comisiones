import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { tiposId } from '@shared/data/tipos-id';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss']
})
export class RegistrarUsuariosComponent implements OnInit {

  formSignup: FormGroup;

  tiposId = tiposId;
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/; //--> EL QUE SE USARÁ

  public loading:boolean = false;
  public error:string = "";
  public submitted:boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioSvc: UsuarioService,
    private ngZone: NgZone,
    private router: Router
  ) { 
    this.formSignup = this.formBuilder.group({
      correoSignup : ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
      passwordSignup : ['', Validators.required],
      nombreSignup : ['', Validators.required],
      apellidoSignup : ['', Validators.required],
      tipoIdSignup : ['', Validators.required],
      identificacionSignup : ['', Validators.required],
      departamentoSignup : ['', Validators.required],
      rolSignup : ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }


  get f() {
    return this.formSignup.controls;
  }

  onSubmit() {
    this.submitted = true;

    // verificacion de errores
    if (this.formSignup.invalid) {
      return;
    }

    const body = {
      correoSignup: this.formSignup.value.correoSignup,
      passwordSignup: this.formSignup.value.passwordSignup,
      nombreSignup: this.formSignup.value.nombreSignup,
      apellidoSignup: this.formSignup.value.apellidoSignup,
      tipoIdSignup: this.formSignup.value.tipoIdSignup,
      identificacionSignup: this.formSignup.value.identificacionSignup,
      departamentoSignup: this.formSignup.value.departamentoSignup,
      rolSignup: this.formSignup.value.rolSignup,
    }

    const reqBody: FormData = new FormData();
    reqBody.append('correoSignup', body.correoSignup);
    reqBody.append('passwordSignup', body.passwordSignup);
    reqBody.append('nombreSignup', body.nombreSignup);
    reqBody.append('apellidoSignup', body.apellidoSignup);
    reqBody.append('tipoIdSignup', body.tipoIdSignup);
    reqBody.append('identificacionSignup', body.identificacionSignup);
    reqBody.append('departamentoSignup', body.departamentoSignup);
    reqBody.append('rolSignup', body.rolSignup);

    this.usuarioSvc.updateUsuario(reqBody).subscribe({
      next: (res) => { 
        Swal.fire({
          title: 'Creado',
          text: '¡El usuario se creó correctamente!',
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tiposId } from '@shared/data/tipos-id';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss']
})
export class RegistrarUsuariosComponent implements OnInit {

  tiposId = tiposId;
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/; //--> EL QUE SE USARÁ


  constructor(
    private formBuilder: FormBuilder,
  ) { }


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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '@interfaces/usuario';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-editar-contrasena',
  templateUrl: './editar-contrasena.component.html',
  styleUrls: ['./editar-contrasena.component.scss']
})
export class EditarContrasenaComponent implements OnInit {

  public usuario!: Usuario;
  public id : Number | string = 0;

  public error:string = "";
  public loading:boolean = false;
  public submitted:boolean = false;


  public editarContrasenaForm: FormGroup;
  
  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 

    this.editarContrasenaForm = this.formBuilder.group({
      actualContrasena: ['', [Validators.required]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      confirmarContrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
    // this.activateRoute.params.subscribe({
    //   next: (params) => {
    //   this.usuarioService.getUsuario().subscribe((resUsuario) => {
    //     this.usuario = resUsuario;
    //   });
    //   } 
    // });
  }

    // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.editarContrasenaForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.editarContrasenaForm.invalid) {
      return;
    }
  }

}

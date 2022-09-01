import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario, UsuarioResponse } from '@interfaces/usuario';
import { LoaderService } from '@services/interceptors/loader.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { ConfirmedValidator } from '@shared/clases/confirmed-validator';
import { tiposId } from '@shared/data/tipos-id';
import { take } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  public id : Number | string = 0;
  public tiposId = tiposId;
  public isLoading = this.loadingSvc.isLoading;
  public usuarioBase!: Usuario;
  private usuario : UsuarioResponse | undefined;

  public error:string = "";
  submitted:boolean = false;

  roles = [
    {
      nombre: "PROFESOR", 
      id: "8"
    }
  ]

  constructor(
    private usuarioSvc: UsuarioService,
    private router: ActivatedRoute,
    private fb : FormBuilder,
    public activateRoute: ActivatedRoute,
    public usuarioService: UsuarioService,
    public loadingSvc : LoaderService
  ) {
    this.router.params.pipe(take(1)).subscribe(params => this.id = params['id']);
  
   }
   formUpdate = this.fb.group({
    nombre: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    apellido: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    tipo_identificacion: ['', [Validators.maxLength(250)]],
    identificacion: [0, [Validators.required, Validators.min(1000), Validators.max(999999999999)]],
    contrasena: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(250)]],
    validarcontrasena: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(250)]],
    roles_id : ['', Validators.required]
   });

  ngOnInit(): void {
      this.activateRoute.params.subscribe({
        next: (params) => {
        this.usuarioService.getUsuario().subscribe((resUsuario) => {
          this.usuario = resUsuario;
          console.log(this.usuario)
        });
        } 
      });

    if (this.id == 'me'){
      this.usuarioSvc.getUsuario().subscribe(
        (data: UsuarioResponse) => {
          this.usuario = data;
          this.id = data.id
          this.formUpdate.patchValue(this.usuario);
        }
      );
    } else {
    this.usuarioSvc.getUsuariobyId(this.id as Number).subscribe(res => {
      this.usuario = res;
      this.formUpdate.patchValue(this.usuario);
    }
    );
  }
}

get f() {
  return this.formUpdate.controls;
}

  submitUpdate() {
    this.submitted = true;
    const usuario = this.formUpdate.value;
    console.log(this.formUpdate.value);
    this.usuarioSvc.updateUsuario({id:this.id ,...usuario}).subscribe(res => {
      console.log(res);
    }
    );
  }

  
}

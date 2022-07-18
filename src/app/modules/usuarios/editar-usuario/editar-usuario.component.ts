import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioResponse } from '@interfaces/usuario';
import { LoaderService } from '@services/loader.service';
import { UsuarioService } from '@services/usuario.service';
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
  private usuario : UsuarioResponse | undefined;

  constructor(
    private usuarioSvc: UsuarioService,
    private router: ActivatedRoute,
    private fb : FormBuilder,
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
   }, {validator: ConfirmedValidator('contrasena', 'validarcontrasena')});

  ngOnInit(): void {

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
  


  submitUpdate() {
    const usuario = this.formUpdate.value;
    this.usuarioSvc.updateUsuario({id:this.id ,...usuario}).subscribe(res => {
      console.log(res);
    }
    );
  }
}

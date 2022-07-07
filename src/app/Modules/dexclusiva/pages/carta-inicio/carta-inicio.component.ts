import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit {
  fecha = new Date();
  usuario :any;
  

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService
  ) {
    
    this.usuarioSvc.getUsuario().subscribe(
      (usuario:any) => {
        console.log(usuario);
        this.usuario = usuario;
      }
    )
   }


   
   
   FormCarta = this.fb.group({
    Cuerpo: ['', Validators.required],
   }
   );

  ngOnInit(): void {
    
  }

  
  OnSubmit() {
    console.log(this.FormCarta.value);
  }

}
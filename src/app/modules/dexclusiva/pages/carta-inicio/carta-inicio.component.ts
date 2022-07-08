import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit {
  fecha = new Date();
  usuario : any;
  

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private router : Router
  ) {
    
    this.usuarioSvc.getUsuario().subscribe(
      (usuario:any) => {
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
    this.router.navigate(['/dexclusiva/formulario-dedicacion']);
  }

}
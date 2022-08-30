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

  formSignup = this.formBuilder.group({
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

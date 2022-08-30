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

  crearUsuarioForm = this.formBuilder.group({
    correo : ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
    password : ['', Validators.required],
    nombre : ['', Validators.required],
    apellido : ['', Validators.required],
    tipo_identificacion : ['', Validators.required],
    identificacion : ['', Validators.required],
    departamento : ['', Validators.required],
    roles_id : ['', Validators.required]
  });

}

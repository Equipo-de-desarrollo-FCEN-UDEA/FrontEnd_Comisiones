import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isCollapsed=true;
  public tiposId=[
    'Cedula de Ciudadania',
    'Cedula de Extranjeria',
    'Pasaporte',
    'Tarjeta de Identidad',
    'Diplomatico',
    'Doc. Ident. De Extranjeros',
    'Ident. Fiscal. Para Ext.',
    'NIT',
    'NIT Persona Natural',
    'NUIP',
    'Registro Civil',
    'Certificado Nacido Vivo',
    'Pasaporte ONU',
    'Permiso especial de permanencia',
    'Salvoconducto de permanencia',
    'Permiso especial formacion PEPFF',
    'Permiso por protección temporal'
  ]
  public roles = [
    {
      id: 5,
      nombre: 'Empleado'
    },
    {
      id: 6,
      nombre: 'Profesor'
    },
    {
      id: 7,
      nombre: 'Estudiante'
    }
  ]

  public deparmentos = [
    {
      id: 1,
      nombre: 'Vicedecanatura FCEN'
    },
    {
      id: 2,
      nombre: 'Extensión'
    }
  ]
 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
  }
  click(){
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed)
  }

}

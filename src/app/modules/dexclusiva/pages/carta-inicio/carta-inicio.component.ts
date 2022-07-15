<<<<<<< HEAD
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
=======
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UsuarioService } from '@services/usuario.service';
>>>>>>> anlly

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit {
  fecha = new Date();
  usuario : any;
<<<<<<< HEAD
  @ViewChild('carta', {static:false}) el!: ElementRef;
  title = 'Carta de Inicio';
=======
>>>>>>> anlly
  

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private router : Router
  ) {
    
    this.usuarioSvc.getUsuario().subscribe(
      (usuario:any) => {
        this.usuario = usuario;
<<<<<<< HEAD
        console.log(usuario)
=======
>>>>>>> anlly
      }
    )
   }


   
   
   FormCarta = this.fb.group({
    Cuerpo: ['', Validators.required],
   }
   );

  ngOnInit(): void {
    
  }

<<<<<<< HEAD
  makePdf() {
    let DATA: any = document.getElementById('carta');
    const boton = document.getElementById('Generador-carta') as HTMLButtonElement;
    const spinner = document.getElementById('spinner') as HTMLDivElement;
    const btntext = document.getElementById('btn-text') as HTMLDivElement;
    spinner.style.display = 'block';
    boton.disabled = true;
    btntext.style.display = 'none';
    html2canvas(DATA,{scale:2}).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('acta-de-inicio.pdf');
    }).then(() => {
      spinner.style.display = 'none';
      boton.disabled = false;
      btntext.style.display = 'block';
    });
  }
=======
>>>>>>> anlly
  
  OnSubmit() {
    console.log(this.FormCarta.value);
    this.router.navigate(['/dexclusiva/formulario-dedicacion']);
  }

}
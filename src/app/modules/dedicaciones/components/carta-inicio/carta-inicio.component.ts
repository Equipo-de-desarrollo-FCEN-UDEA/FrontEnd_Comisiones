import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuarios/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CartaInicioService } from '@services/dedicaciones/carta-inicio.service';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';
import { Carta } from '@interfaces/dedicaciones/carta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit {
  fecha = new Date();
  usuario : any;
  @ViewChild('carta', {static:false}) el!: ElementRef;
  title = 'Carta de Inicio';

  carta : Carta = {
    body: '',
    dedicaciones_id: 0,
    archivo: '',
  }
  archivo : any;
  _Body : string = '';

  @Input() set Body(value : string) {
    this._Body = value;
    this.FormCarta.controls.Cuerpo.setValue(this._Body);
  }
  

  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private router : Router,
    private cartaSvc : CartaInicioService,
    private comunicationSvc : CrearComisionComponentsService
  ) {
    
    this.usuarioSvc.getUsuario().subscribe(
      (usuario:any) => {
        this.usuario = usuario;
      }
    )
   }


   
   
   FormCarta = this.fb.group({
    Cuerpo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1300)]],
   }
   );

  ngOnInit(): void {
  }
    
  makePdf(): any {
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
      this.archivo = new Blob([PDF.output('blob')],{type : 'application/pdf'});
      this.archivo.lastModified = new Date();
      this.archivo.name = 'Acta de Inicio.pdf';
      this.archivo = <File>this.archivo
      let dedicacion_id : number | string = 0;
      this.comunicationSvc.id$.subscribe(
        (      id: string | number) => {
          dedicacion_id = id;
        }
      ).unsubscribe();


      this.carta = {
        body: this.FormCarta.value.Cuerpo || '',
        dedicaciones_id: dedicacion_id,
        archivo: this.archivo
      }
      this.cartaSvc.postCarta(this.carta).subscribe(
        (data:any) => {
            Swal.fire({
              // title: 'Carta de Inicio',
              text: data.message,
              icon: 'success',
             confirmButtonText: 'Aceptar'
           })
           this.comunicationSvc.setCartaSuccess(true);
        });

    
    }).then(() => {
      spinner.style.display = 'none';
      boton.disabled = false;
      btntext.style.display = 'block';
    });

    
  }
  
  OnSubmit() {
    this.makePdf()
  }


}
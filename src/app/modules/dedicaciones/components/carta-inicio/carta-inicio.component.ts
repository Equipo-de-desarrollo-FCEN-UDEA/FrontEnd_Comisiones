import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuarios/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CartaInicioService } from '@services/dedicaciones/carta-inicio.service';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';
import { Carta, CartaInside } from '@interfaces/dedicaciones/carta';
import Swal from 'sweetalert2';
import { prefix } from '@shared/data/ruta-api';

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit, AfterViewInit {
  fecha = new Date();
  usuario: any;
  @ViewChild('carta', { static: false }) el!: ElementRef;
  title = 'Carta de Inicio';

  carta: Carta = {
    body: '',
    dedicaciones_id: 0,
  }

  prefix = prefix

  carta_id = 0

  archivo: any;
  private _editing: boolean = false

  @Input() set editing(value: boolean) {
    this._editing = value
  }


  constructor(
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private router: Router,
    private cartaSvc: CartaInicioService,
    private comunicationSvc: CrearComisionComponentsService
  ) {

    this.usuarioSvc.getUsuario().subscribe(
      (usuario: any) => {
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

  ngAfterViewInit(): void {
    let carta = document.getElementById('carta')

    if (carta) {
      let deviceWidth = window.screen.width
      if (deviceWidth < 574) {
        carta.style.fontSize = `${deviceWidth / 60}px`
      }
    }

    this.comunicationSvc.editCarta$.subscribe(
      (carta: CartaInside | null) => {
        if (carta?.body) {
          this.FormCarta.controls.Cuerpo.setValue(carta.body);
          this.carta_id = carta?.id
        }
      }
    )




    // Mala practica, debe corregirse
    setTimeout(() => {
      let container = document.getElementById("clientCont")
      if (container) {
        container.style.maxWidth = container.clientWidth + "px";
      }
    }, 2000);

  }

  makePdf(): any {
    const boton = document.getElementById('Generador-carta') as HTMLButtonElement;
    const spinner = document.getElementById('spinner') as HTMLDivElement;
    const btntext = document.getElementById('btn-text') as HTMLDivElement;
    spinner.style.display = 'block';
    boton.disabled = true;
    btntext.style.display = 'none';
    let dedicacion_id: number | string = 0;
    this.comunicationSvc.id$.subscribe(
      (id: string | number) => {
        dedicacion_id = id;
      }
    ).unsubscribe();


    this.carta = {
      body: this.FormCarta.value.Cuerpo || '',
      dedicaciones_id: dedicacion_id
    }
    if (this._editing) {
      this.cartaSvc.updateCarta(this.carta, this.carta_id).subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Carta de iniciación actualizada con éxito',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.comunicationSvc.setCartaSuccess(true);
        });
    } else {
      this.cartaSvc.postCarta(this.carta).subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Carta de iniciación generada con éxito',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.comunicationSvc.setCartaSuccess(true);
        });
    }


  }

  OnSubmit() {
    console.log('submit')
    this.makePdf()
  }


}
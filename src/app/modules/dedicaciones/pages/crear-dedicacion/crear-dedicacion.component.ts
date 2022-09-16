import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';

import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';

@Component({
  selector: 'app-crear-dedicacion',
  templateUrl: './crear-dedicacion.component.html',
  styleUrls: ['./crear-dedicacion.component.scss']
})
export class CrearDedicacionComponent implements OnInit, OnChanges {

  @Input()
  isLinear = false;

  @Input()
  isEditable = true;

  id$ : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  cartaSuccess$ = this.comunicacionSvc.cartaSuccess$;
  formatoSuccess$ = this.comunicacionSvc.formatoSuccess$;
  planSuccess$ = this.comunicacionSvc.planSuccess$;

  constructor(
    private dexclusivaSvc: DedicacionService,
    private comunicacionSvc : CrearComisionComponentsService,
    private router: Router
  ) {
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambios')
    
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      title: '¡Bienvenido!',
      text: 'Para crear una nueva dedicación escribe una corta descripción solo como referencia para la aplicación.',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      reverseButtons: true,
      
      preConfirm: (description) => {
        if (!description) {
          return Swal.showValidationMessage('Debes escribir una descripción');
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.dexclusivaSvc.postDedicacion(result.value).subscribe({
          next: (data: any) => {
            this.comunicacionSvc.setId(data.dedicaciones_id);
            Swal.fire({
              title: '¡Tu dedicación inició!',
              text: 'Ahora puedes empezar a crearla, el proceso es sencillo, en la parte izquierda verás un menú con 3 elementos que debes llenar para poder hacer la dedicación'
            });
          },
          error: (err: any) => {
            Swal.fire({
              title: 'Algo ocurrió mal',
              text: err.msg,
              icon: 'error',
            })}
        })
        
      } 
      else {
        this.router.navigate(['/'])
      }
    })
  }

}

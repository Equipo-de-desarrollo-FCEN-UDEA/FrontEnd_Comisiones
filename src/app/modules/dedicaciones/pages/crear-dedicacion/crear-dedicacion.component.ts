import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';

import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearDedicacionComponentsService } from '../../services/crear-dedicacion-components.service';

@Component({
  selector: 'app-crear-dedicacion',
  templateUrl: './crear-dedicacion.component.html',
  styleUrls: ['./crear-dedicacion.component.scss']
})
export class CrearDedicacionComponent implements OnInit, OnChanges {

  @Input()
  isLinear = false;

  // @Input()
  // isEditable = true;

  params = [true, false, false];
  idDedicacion: string | number = '0';

  id$ : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  @Output() paramsEmiter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();


  cartaSuccess$ = this.comunicacionSvc.cartaSuccess$;
  formatoSuccess$ = this.comunicacionSvc.formatoSuccess$;
  planSuccess$ = this.comunicacionSvc.planSuccess$;

  constructor(
    private dexclusivaSvc: DedicacionService,
    private comunicacionSvc : CrearDedicacionComponentsService,
    private router: Router
  ) {


   }

   changeParams(params:boolean[]){
    this.params=params
    
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.cartaSuccess$.observed)
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      title: '¡Bienvenido!',
      text: 'Para crear una nueva dedicación escribe un título solo como referencia para la aplicación.',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      reverseButtons: true,
      
      preConfirm: (titulo) => {
        if (!titulo) {
          return Swal.showValidationMessage('Debes escribir un título');
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.dexclusivaSvc.postDedicacion(result.value).subscribe({
          next: (data: any) => {
            //this.comunicacionSvc.setId(data.dedicaciones_id);
            console.log('en crear dedicacion', data.dedicaciones_id)
            this.idDedicacion = data.dedicaciones_id;
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

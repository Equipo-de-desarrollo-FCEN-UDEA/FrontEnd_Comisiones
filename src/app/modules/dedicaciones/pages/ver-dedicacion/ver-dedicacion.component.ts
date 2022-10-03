import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CrearComisionComponentsService } from '../../services/crear-comision-components.service';

@Component({
  selector: 'app-ver-dedicacion',
  templateUrl: './ver-dedicacion.component.html',
  styleUrls: ['./ver-dedicacion.component.scss']
})
export class VerDedicacionComponent implements OnInit {

  public dedicacion$!: Observable<DedicacionDTO>;


  public documentosArray = [];

  public estadoActual : string = '';
  public rol : string = localStorage.getItem('rol') || '';

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  public fechaCreacion : any | null = null;

  constructor(

    private dedicacionSvc : DedicacionService,
    private activatedRoute : ActivatedRoute,
    private comunicacionSvc : CrearComisionComponentsService,
    private router : Router,
    private loaderSvc : LoaderService

  ) {
        
      let id : number;
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.comunicacionSvc.setId(id); 
        this.dedicacion$ = this.dedicacionSvc.getDedicacion(id)
      });

      this.dedicacion$.subscribe(dedicacion => {
        this.fechaCreacion = dedicacion.intermediate_dedicaciones[0]? new Date(dedicacion.intermediate_dedicaciones[0].createdAt) : null;
        this.estadoActual = ultimoElement(dedicacion.intermediate_dedicaciones)?.intermediate_estados?.nombre ? ultimoElement(dedicacion.intermediate_dedicaciones).intermediate_estados.nombre : 'EN CREACIÓN';
      });

    }

  ngOnInit(): void{
  }

  delete(id: number) : void{

    Swal.fire({
      title: '¿Seguro que quieres eliminar esta dedicación?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dedicacionSvc.deleteDedicacion(id).subscribe({
          next: (response : any) => {
            this.router.navigate(['/home']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡la dedicación ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          }
        });
      }
    });
    
  }
}
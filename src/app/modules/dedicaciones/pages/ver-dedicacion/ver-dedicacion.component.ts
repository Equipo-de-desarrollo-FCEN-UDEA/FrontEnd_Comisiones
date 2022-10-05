import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { DedicacionxestadoService } from '@services/dedicaciones/dedicacionxestado.service';
import { DescargarDocumentosService } from '@services/descargar-documentos.service';
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

  public rol : string = localStorage.getItem('rol') || '';

  public documentosArray : any[] = [];

  public id: string | number = 0

  error:string = '';

  public estadoActual : string = '';

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  public fechaCreacion : any | null = null;

  constructor(

    private dedicacionSvc : DedicacionService,
    private activatedRoute : ActivatedRoute,
    private comunicacionSvc : CrearComisionComponentsService,
    private router : Router,
    private loaderSvc : LoaderService,
    private descargarDocumentoSvc: DescargarDocumentosService,
    private dedicacionEstadosSvc: DedicacionxestadoService

  ) {
        
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.comunicacionSvc.setId(this.id); 
        this.dedicacion$ = this.dedicacionSvc.getDedicacion(this.id)
      });

      this.dedicacion$.subscribe(dedicacion => {
        console.log(dedicacion);
        this.fechaCreacion = dedicacion.intermediate_dedicaciones[0]? new Date(dedicacion.intermediate_dedicaciones[0].createdAt) : null;
        this.estadoActual = ultimoElement(dedicacion.intermediate_dedicaciones)?.intermediate_estados?.nombre;
        this.documentosArray.push(dedicacion.cartas?.documentos);
        this.documentosArray.push(dedicacion.plantrabajo?.documentos);
        this.documentosArray.push(dedicacion.formatosvice?.documentos[0]);
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

  abrirDocumento(id: number | string) {
    this.descargarDocumentoSvc.downloadDocumento(id).subscribe({
      next: (res) => {
        window.open(window.URL.createObjectURL(res))
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      },
    });
  }

  solicitarDedicacion(){
    this.dedicacionEstadosSvc.postDedicacionxEstado(this.id).subscribe({
      next: res => {
        Swal.fire({
          title: 'Solicitada!',
          text: '¡la dedicación ha sido solicitada!',
          icon: 'success',
          confirmButtonColor: '#3AB795',
        });
      },
      error: res =>{
        Swal.fire({
          title: 'Error!',
          text: res.error.msg,//'Asegurate de que todos los documentos se encuentren diligenciados',
          icon: 'error',
          confirmButtonColor: '#3AB795',
        });
      }
    })
  }
}
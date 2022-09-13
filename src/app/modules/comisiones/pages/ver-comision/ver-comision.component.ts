import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import Swal from 'sweetalert2';


// --------- SERVICIOS E INTERFACES ---------
import { ultimoElement } from "@shared/clases/ultimo-estado";
import { Comision } from '@interfaces/comisiones';
import { LoaderService } from '@services/interceptors/loader.service';
import { ComisionesService } from '@services/comisiones/comisiones.service';
import { DescargarDocumentosService } from '@services/descargar-documentos.service';
import { CumplidosService } from '@services/comisiones/cumplidos.service';

@Component({
  selector: 'app-ver-comision',
  templateUrl: './ver-comision.component.html',
  styleUrls: ['./ver-comision.component.scss']
})
export class VerComisionComponent {

  public rol : string = localStorage.getItem('rol') || '';

  mostrarEstados = false;
  error:string = '';
  isDelete = false;

  public comision!: Comision;

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  documentosArray:any = [];
  cumplidosArray:any = [];
  documentCumplido:any; 
  fechaCreacion:any = '';

  ultimoElemento = ultimoElement
  estadoActual:any = '';

  estados:any = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderSvc: LoaderService,

    private comisionesSvc: ComisionesService,
    private descargarDocumentoSvc: DescargarDocumentosService,
    private cumplidosSvc: CumplidosService
  ) { 

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
        next: (paramId) => {
           const id = paramId['id'];
           console.log(id)
            if (id) {
              this.comisionesSvc.getComision(id).subscribe({
                next: (res) => {
                this.comision = res;
                this.comision?.documentos.forEach(documento => this.documentosArray.push(documento));
                this.comision?.cumplidos.forEach(cumplido => this.cumplidosArray.push(cumplido));
                this.fechaCreacion = this.comision?.intermediate_comisiones[0].createdAt;
                this.estadoActual = this.ultimoElemento(res.intermediate_comisiones).intermediate_estados;
                this.estados = this.comision.intermediate_comisiones;
              }, error: (err) => {
                if (err.status === 404 || err.status === 401) {
                  this.error = err.error.msg; // mensaje desde el back
                   this.router.navigate(['/'])
                }
              }
              });
            }
        },
        error: (err) => {
          if (err.status === 404 || err.status === 401) {
          }
        },
      });

  }

  open(){ 
    this.mostrarEstados = !this.mostrarEstados ;
  }


  abrirDocumento(id:number){
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


  abrirCumplido(id:number){
    // Buscar el documento del cumplido
    this.cumplidosSvc.getCumplido(id).subscribe({
      next: (res)=> {
        this.documentCumplido = res;
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      }
    });
    //Abrir el cumplido
    this.abrirDocumento(this.documentCumplido.id)
  }

  
  eliminarComision(id: any): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta comisión?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {

        this.isDelete = true;

        this.comisionesSvc.deleteComision(id).subscribe({
          next: (response) => {
            this.router.navigate(['/home']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡la comisión ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
            }
          },
        });
      }
    });
  }
}


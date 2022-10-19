import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Permiso} from '@interfaces/permisos';
import { LoaderService } from '@services/interceptors/loader.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { DescargarDocumentosService } from '@services/descargar-documentos.service';
import { PermisoService } from '@services/permisos/permiso.service';



@Component({
  selector: 'app-ver-permiso',
  templateUrl: './ver-permiso.component.html',
  styleUrls: ['./ver-permiso.component.scss']
})
export class VerPermisoComponent implements OnInit {

  public rol : string = localStorage.getItem('rol') || '';
  public loading:boolean = false;
  public isDelete:boolean = false;
  public error:string = '';
  public permiso: Permiso| undefined;

  // Loader
  public isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Documentos 
  public documentosArray:any = [];
  public fechaCreacion:any = '';


  // Estados 
  ultimoElemento = ultimoElement
  public estadoActual:any = '';
  public estados:any = [];
  public mostrarEstados = false;


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderSvc: LoaderService,

    private permisosSvc: PermisoService,
    private descargarDocumentoSvc: DescargarDocumentosService
  ) { 

  } 

  
  // -----------------------------------------
  // -------------- VER PERMISO -------------
  // -----------------------------------------
  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (paramId) => {
         const ID = paramId['id'];
          if (ID) {
            this.permisosSvc.getPermiso(ID).subscribe({
              next: (res)=> {
                this.permiso = res;
                this.permiso?.documentos.forEach(documento => this.documentosArray.push(documento));
                this.estados = this.permiso?.intermediate_permisos;
                this.fechaCreacion = this.permiso?.intermediate_permisos[0].createdAt;
                this.estadoActual = this.ultimoElemento(res.intermediate_permisos).intermediate_estados?.nombre;
              },
              error: (err) => {
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
          this.error = err.error.msg; // mensaje desde el back
           this.router.navigate(['/'])
        }
      }
    });
  }


  open(){ 
    this.mostrarEstados = !this.mostrarEstados ;
  }


  // -----------------------------------------
  // -------- VER DOCUMENTOS ADJUNTOS --------
  // -----------------------------------------
  abrirDocumento(id:number){
    this.descargarDocumentoSvc.downloadDocumento(id).subscribe({
      next: (res) => {
        window.open(window.URL.createObjectURL(res))
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
          this.loading = false;
        }
      },
    });
  }

  
  // -----------------------------------------
  // ------------ ELIMINAR PERMISO ------------
  // -----------------------------------------
  delete(id: any): void {
    this.isDelete = true;
    Swal.fire({
      title: '¿Seguro que quieres eliminar este permiso?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.permisosSvc.deletePermiso(id).subscribe({
          next: () => {
            this.router.navigate(['/home']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡El permiso ha sido eliminado!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
              this.loading = false;
            }
          },
        });
      }
    });
  }
}


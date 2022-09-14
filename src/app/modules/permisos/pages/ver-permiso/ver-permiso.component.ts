import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Permiso, PermisosInside } from '@interfaces/permisos';
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
  loading:boolean = false;
  isDelete:boolean = false;
  error:string = '';
  permiso: Permiso| undefined;

  // Loader
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Documentos 
  documentosArray:any = [];
  fechaCreacion:any = '';


  // Estados 
  ultimoElemento = ultimoElement
  estadoActual:any = '';
  estados:any = [];
  mostrarEstados = false;


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
         const id = paramId['id'];
          if (id) {
            this.permisosSvc.getPermiso(id).subscribe({
              next: (res)=> {
                this.permiso = res;
                this.permiso?.documentos.forEach(documento => this.documentosArray.push(documento));
                this.estados = this.permiso?.intermediate_permisos;
                this.fechaCreacion = this.permiso?.intermediate_permisos[0].createdAt;
                this.estadoActual = this.ultimoElemento(res.intermediate_permisos).intermediate_estados?.nombre;
                console.log(this.permiso)
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
    const reader = new FileReader();
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
          next: (response) => {
            console.log(response);
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


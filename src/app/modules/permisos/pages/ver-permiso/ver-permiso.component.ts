import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso, PermisosInside } from '@interfaces/permisos';
import { DescargarDocumentosService } from '@services/descargar-documentos.service';
import { LoaderService } from '@services/loader.service';
import { PermisoService } from '@services/permiso.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-permiso',
  templateUrl: './ver-permiso.component.html',
  styleUrls: ['./ver-permiso.component.scss']
})
export class VerPermisoComponent implements OnInit {

  loading:boolean = false;
  error:string = '';
  permiso: Permiso| undefined;

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;


  documentosArray:any = [];
  fechaCreacion:any = '';

  ultimoElemento = ultimoElement
  estadoActual:any = '';


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderSvc: LoaderService,

    private permisosSvc: PermisoService,
    private descargarDocumentoSvc: DescargarDocumentosService
  ) { 
    this.activateRoute.params.subscribe({
      next: (paramId) => {
         const id = paramId['id'];
          if (id) {
            this.permisosSvc.getPermiso(id).subscribe((res) => {
              this.permiso = res;
              this.permiso?.documentos.forEach(documento => this.documentosArray.push(documento));
              //this.fechaCreacion = this.permiso?.intermediate_permisos[0].created_at;
              this.estadoActual = this.ultimoElemento(res.intermediate_permisos).intermediate_estados?.nombre;
              console.log(this.permiso); 
            });
          }

      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg; // mensaje desde el back
          //this.loading = false;
        }
      },
    });
  } 

  ngOnInit(): void {
  }

  abrirDocumento(id:number){
    this.descargarDocumentoSvc.descargarDocumento(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
          this.loading = false;
        }
      },
    }
      
    );
  }
  
  delete(id: any): void {
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
        this.permisosSvc.delete(id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home/permisos']);
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


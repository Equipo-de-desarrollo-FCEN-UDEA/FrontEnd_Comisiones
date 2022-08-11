import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ultimoElement } from "@shared/clases/ultimo-estado";
import Swal from 'sweetalert2';


import { Comision } from '@interfaces/comisiones';
import { LoaderService } from '@services/loader.service';
import { ComisionesService } from '@services/comisiones.service';
import { DescargarDocumentosService } from '@services/descargar-documentos.service';

@Component({
  selector: 'app-ver-comision',
  templateUrl: './ver-comision.component.html',
  styleUrls: ['./ver-comision.component.scss']
})
export class VerComisionComponent implements OnInit {

  loading:boolean = false;
  error:string = '';
  comision: Comision| undefined;

  isLoading: Subject<boolean> = this.loaderSvc.isLoading;


  documentosArray:any = [];
  fechaCreacion:any = '';

  ultimoElemento = ultimoElement
  estadoActual:any = '';


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loaderSvc: LoaderService,

    private comisionesSvc: ComisionesService,
    private descargarDocumentoSvc: DescargarDocumentosService
  ) { 

    this.activateRoute.params.subscribe({
        next: (paramId) => {
           const id = paramId['id'];
            if (id) {
              this.comisionesSvc.getComision(id).subscribe((res) => {
                this.comision = res;
                this.comision.documentos.forEach(documento => this.documentosArray.push(documento));
                this.fechaCreacion = this.comision.intermediate_comisiones[0].createdAt;
                this.estadoActual = this.ultimoElemento(res.intermediate_comisiones).intermediate_estados?.nombre;
                console.log(this.comision); 
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
      title: '¿Seguro que quieres eliminar esta comisión?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comisionesSvc.delete(id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home/comisiones']);
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
              this.loading = false;
            }
          },
        });
      }
    });
  }
}

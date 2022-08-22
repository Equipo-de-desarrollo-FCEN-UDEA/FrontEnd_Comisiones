import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
<<<<<<< HEAD
=======
import { FormBuilder, Validators } from '@angular/forms';
>>>>>>> main
import { Permiso } from '@interfaces/permisos';
import { BuscarPermisosService} from '@services/busquedas/buscar-permisos.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { NgbdSortableHeader, SortEvent } from '@shared/directivas/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscar-permiso',
  templateUrl: './buscar-permiso.component.html',
  styleUrls: ['./buscar-permiso.component.scss'],
  providers: [BuscarPermisosService, DecimalPipe]
})
export class BuscarPermisoComponent{
  
  permisos$: Observable<Permiso[]>;
  total$: Observable<number>;
  
  ListPermisos = false;
  error='';
  ultimoElemento = ultimoElement;
  

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
<<<<<<< HEAD
    public service: BuscarPermisosService
=======
    public service: BuscarPermisosService,
>>>>>>> main
    ) {
      this.permisos$ = service.permisos$;
      this.total$ = service.total$;
      this.ultimoElemento = ultimoElement;
<<<<<<< HEAD
      
    
    }

=======
    }

    changeOption(event:any){
      console.log(event.target.value);
      this.service.archivados(event.target.value);
      this.service.ngOnchanges();
    }
>>>>>>> main
    

    onSort({ column, direction}: SortEvent) {
      // resetting other headers

      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      this.service.sortColumn = "";
      this.service.sortDirection = direction;
    }




}

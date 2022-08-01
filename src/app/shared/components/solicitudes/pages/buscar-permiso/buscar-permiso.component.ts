import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Permiso } from '@interfaces/permisos';
import { BuscarPermisosService } from '@services/buscar-permisos.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { NgbdSortablePermiso, SortEvent } from '@shared/directivas/sortable-permiso.directive';
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

  @ViewChildren(NgbdSortablePermiso) headers!: QueryList<NgbdSortablePermiso>;

  constructor(
    public service: BuscarPermisosService,
    ) {
      this.permisos$ = service.permisos$;
      this.total$ = service.total$;
      this.ultimoElemento = ultimoElement;
    }

    onSort({column, direction}: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }




}

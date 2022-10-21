import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Usuario } from '@interfaces/usuario';
import { BuscarUsuariosService } from '@services/busquedas/buscar-usuarios.service';
import { NgbdSortableHeader, SortEvent } from '@shared/directivas/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent {
  usuarios$: Observable<Usuario[]>;
  total$: Observable<number>;
  error = ';';

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public BuscarService: BuscarUsuariosService,
    ) { 
      this.usuarios$=BuscarService.usuarios$;
      this.total$=BuscarService.total$;
    }

    onSort({column, direction}: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });

      this.BuscarService.sortColumn = "";
      this.BuscarService.sortDirection = direction
    }

    refresh(){
      this.BuscarService.ngOnchanges();
    }
  }
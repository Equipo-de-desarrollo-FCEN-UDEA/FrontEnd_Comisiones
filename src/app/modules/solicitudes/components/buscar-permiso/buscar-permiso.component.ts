import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Permiso } from '@interfaces/permisos';
import { BuscarPermisosService} from '@services/busquedas/buscar-permisos.service';
import { PermisoService } from '@services/permisos/permiso.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { NgbdSortableHeader, SortEvent } from '@shared/directivas/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscar-permiso',
  templateUrl: './buscar-permiso.component.html',
  styleUrls: ['./buscar-permiso.component.scss'],
  providers: [BuscarPermisosService, DecimalPipe]
})

export class BuscarPermisoComponent {
  permisos$: Observable<Permiso[]>;
  total$: Observable<number>;
  ultimoElemento = ultimoElement;
  

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  public rol : string = localStorage.getItem('rol') || '';
  

  constructor(
    public Buscarservice: BuscarPermisosService,
    public permisoService: PermisoService
    ) {
      this.permisos$ = Buscarservice.permisos$;
      this.total$ = Buscarservice.total$;
      this.ultimoElemento = ultimoElement;
    }
    
  changeOption(event:any){
    this.Buscarservice.archivados(event.target.value);
  }

  archivarPermiso(id:number){
    this.permisoService.Archivado(id).subscribe({
      next: () => this.Buscarservice.ngOnchanges()
    })
    
    // console.log("archivado")
  }
  
  desarchivarPermiso(id:number){
    this.permisoService.NoArchivado(id).subscribe(
      {
        next: () => this.Buscarservice.ngOnchanges()
      }
    )
    
    // console.log("desarchivado")
  }
  
  onSort({ column, direction}: SortEvent) {
      // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
          header.direction = '';
        }
    });
    
    this.Buscarservice.sortColumn = "";
    this.Buscarservice.sortDirection = direction;
  }
}

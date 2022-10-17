import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Dedicacion, DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { BuscarDedicacionService } from '@services/busquedas/buscar-dedicacion.service';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { ultimoElement } from '@shared/clases/ultimo-estado';
import { NgbdSortableHeader, SortEvent } from '@shared/directivas/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscar-dexclusiva',
  templateUrl: './buscar-dexclusiva.component.html',
  styleUrls: ['./buscar-dexclusiva.component.scss']
})
export class BuscarDexclusivaComponent {
  dedicaciones$: Observable<DedicacionDTO[]>;
  total$: Observable<number>;
  ultimoElemento = ultimoElement

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  public rol: string = localStorage.getItem('rol') || '';

  constructor(
    public Buscarservice: BuscarDedicacionService,
    public dedicacionService: DedicacionService
  ) {
    this.dedicaciones$ = Buscarservice.dedicaciones$
    this.total$ = Buscarservice.total$
    this.ultimoElemento = ultimoElement
    this.dedicaciones$.subscribe(dedicacion => console.log(dedicacion))
  }

  // changeOption(event:any){
  //   this.Buscarservice.archivados(event.target.value);
  //   this.Buscarservice.ngOnchanges();
  // }

  // archivarDedicacion(id:number){
  //   this.dedicacionService.Archivado(id).subscribe()
  //   this.Buscarservice.ngOnchanges()
  // }

  // desarchivarDedicacion(id:number){
  //   this.dedicacionService.NoArchivado(id).subscribe()
  //   this.Buscarservice.ngOnchanges()
  // }

  refresh() {
    this.Buscarservice.ngOnchanges();
  }

  onSort({ column, direction }: SortEvent) {
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

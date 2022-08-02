import { TypeofExpr } from '@angular/compiler';
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from "../components/tablas/tabla-solicitudes/country";
import { Comision } from '@interfaces/comisiones';
import { Permiso } from '@interfaces/permisos';





export type SortColumn = keyof Comision | "";
export type SortColumnP = keyof Permiso | "";
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn ;
  columnP: SortColumnP;
  direction: SortDirection;

}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '' ;
  @Input() sortableP: SortColumnP = '' ;

  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, columnP: this.sortableP, direction: this.direction});
  }
}

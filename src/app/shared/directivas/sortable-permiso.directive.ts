import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Permiso } from '@interfaces/permisos';



export type SortColumn = keyof  Permiso | "";

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  columnP: SortColumn;
  directionP: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortablePermiso {

  @Input() sortableP: SortColumn = '' ;
  @Input() directionP: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.directionP = rotate[this.directionP];
    this.sort.emit({columnP: this.sortableP, directionP: this.directionP});
  }
}


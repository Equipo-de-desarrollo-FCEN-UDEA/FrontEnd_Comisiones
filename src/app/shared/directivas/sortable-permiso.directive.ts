import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { Permiso } from '@interfaces/permisos';



export type SortColumnP = keyof  Permiso | "";

export type SortDirectionP = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirectionP} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumnP;
  direction: SortDirectionP;
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

  @Input() sortable: SortColumnP = '' ;
  @Input() direction: SortDirectionP = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


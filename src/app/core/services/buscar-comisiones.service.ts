// import {Injectable, PipeTransform} from '@angular/core';
// import { ultimoElement } from "@shared/clases/ultimo-estado";

// import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

// import {Comision} from '../interfaces/comisiones';
// import {DatePipe, DecimalPipe} from '@angular/common';
// import {debounceTime, delay, map, switchMap, tap} from 'rxjs/operators';
// import {SortColumn, SortDirection} from '../../shared/directivas/sortable.directive';
// import { TablaSolicitudesComponent } from "@shared/components/tablas/tabla-solicitudes/tabla-solicitudes.component";
// import { ComisionesService } from './comisiones.service';

// interface BuscarResult {
//   comisiones: Comision[];
//   total: number;
// }

// interface State {
//   page: number;
//   pageSize: number;
//   searchTerm: string;
//   sortColumn: SortColumn;
//   sortDirection: SortDirection;
// }

// let compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(comisiones: Comision[], column: SortColumn, direction: string): Comision[] {
//   if (direction === '' || column === '') {
//     return comisiones;
//   } else {
//     return [...comisiones].sort((a, b) => {
//       let res = compare(a[column], b[column]);
//       return direction === 'asc' ? res : -res;
//     });
//   }
// }


// function matches(comisiones: Comision, term: string, pipe: PipeTransform, datepipe:DatePipe ) {
//   return (
//     datepipe.transform(comisiones.id)?.includes(term) ||
//     comisiones.tipos_comision.nombre.toLowerCase().includes(term.toLowerCase())||
//     comisiones.tipos_comision.nombre.toLowerCase().includes(term.toLowerCase()) ||
//     ultimoElement(comisiones.intermediate_comisiones)?.intermediate_estados.nombre.toLowerCase().includes(term.toLowerCase)||
//     ultimoElement(comisiones.intermediate_comisiones)?.intermediate_estados.created_at.toLowerCase().includes(term.toLowerCase)||
//     comisiones.usuarios.nombre.toLowerCase().includes(term) ||
//     comisiones.usuarios.apellido.toLowerCase().includes(term) ||
//     comisiones.usuarios.departamentos.nombre.toLowerCase().includes(term) ||
//     comisiones.usuarios.departamentos.facultades.nombre.toLowerCase().includes(term) 
//   );
// }


// @Injectable({providedIn: 'root'})
// export class BuscarComisionesService {
//   private _loading$ = new BehaviorSubject<boolean>(true);
//   private _search$ = new Subject<void>();
//   private _comisiones$ = new BehaviorSubject<Comision[]>([]);
//   private _total$ = new BehaviorSubject<number>(0);

//   private _state: State = {
//     page: 1,
//     pageSize: 4,
//     searchTerm: '',
//     sortColumn: '',
//     sortDirection: ''
//   };

//   constructor(
//     private pipe: DecimalPipe,
//     private comisionesService: ComisionesService,
//     private datepipe: DatePipe
//   ) {
//     this._search$
//       .pipe(
//         tap(() => this._loading$.next(true)),
//         //debounceTime(200),
//         switchMap(() => this._search()),
//         //delay(200),
//         tap(() => this._loading$.next(false))
//       )
//       .subscribe((result) => {
//         this._comisiones$.next(result.comisiones);
//         this._total$.next(result.total);
//       });

//     this._search$.next();
//   }

//   get comisiones$() {
//     return this._comisiones$.asObservable();
//   }

//   get total$() {
//     return this._total$.asObservable();
//   }
//   get loading$() {
//     return this._loading$.asObservable();
//   }
//   get page() {
//     return this._state.page;
//   }
//   get pageSize() {
//     return this._state.pageSize;
//   }
//   get searchTerm() {
//     return this._state.searchTerm;
//   }

//   set page(page: number) {
//     this._set({ page });
//   }
//   set pageSize(pageSize: number) {
//     this._set({ pageSize });
//   }
//   set searchTerm(searchTerm: string) {
//     this._set({ searchTerm });
//   }
//   set sortColumn(sortColumn: SortColumn) {
//     this._set({ sortColumn });
//   }
//   set sortDirection(sortDirection: SortDirection) {
//     this._set({ sortDirection });
//   }

//   // Set and search:

//   private _set(patch: Partial<State>) {
//     Object.assign(this._state, patch);
//     this._search$.next();
//   }


  
//   private _search(): Observable<BuscarResult> {
//     const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

//     // 1. sort
//     let comisiones = sort(this._comisiones$, sortColumn, sortDirection);

//     // 2. filter
//     comisiones = comisiones.filter(comision => matches(comision, searchTerm, this.pipe));
//     const total = ccomisiones.length;

//     // 3. paginate
//     countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
//     return of({countries, total});
//   }


  
// }

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Dedicacion } from '@interfaces/dedicaciones/dedicaciones';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '@shared/directivas/sortable.directive';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

export type SortColumn = keyof Dedicacion | "";

interface SearchResult {
  dedicaciones: Dedicacion[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | any, v2: string | any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(dedicaciones: Dedicacion[], column: SortColumn, direction: string): Dedicacion[] {
  if (direction === '' || column === '') {
    return dedicaciones;
  } 
  else {
    return [...dedicaciones].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(dedicaciones: Dedicacion, term: string, datepipe: DatePipe) {
  term = term.toLowerCase();
  return (
    dedicaciones.descripcion.toLowerCase().includes(term) ||
    datepipe.transform(dedicaciones.createdAt, 'yyyy-MM-dd')?.toString().includes(term)||
    dedicaciones.usuarios.nombre.toLowerCase().includes(term) ||
    dedicaciones.usuarios.apellido.toLowerCase().includes(term) ||
    dedicaciones.usuarios.departamentos.nombre.toLowerCase().includes(term) ||
    dedicaciones.usuarios.departamentos.facultades.nombre.toLowerCase().includes(term) 
  );
} 

@Injectable({providedIn: 'root'})

export class BuscarDedicacionService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _dedicaciones$ = new BehaviorSubject<Dedicacion[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
    page: 1,
    pageSize: 15,
    searchTerm: '',
    sortColumn: '',
    sortDirection: 'asc'
  };

  DEDICACIONES : any[] = [];

  // archivado$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private dedicacionesSvc: DedicacionService,
    private datepipe: DatePipe
  ){
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
        this._dedicaciones$.next(result.dedicaciones);
        this._total$.next(result.total);
      });

    this._search$.next();
    this.dedicacionesSvc.getDedicaciones()
    .subscribe(
      (resp: any ) => {
        this.DEDICACIONES = resp;
      })
  }

  // archivados(archivado:number){
  //   this.archivado$.next(archivado);
  // }

  ngOnchanges(){
    this.dedicacionesSvc.getDedicaciones()
    .subscribe(
      (resp: any) => {
        this.DEDICACIONES = resp;
        this._dedicaciones$.next(this.DEDICACIONES);
        this._search$.next();
      }
    )
   }
   
  get dedicaciones$() { return this._dedicaciones$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }


  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let dedicaciones = sort(this.DEDICACIONES as Dedicacion[], sortColumn, sortDirection);

    // 2. filter

    dedicaciones = dedicaciones.filter(dedicacion => matches(dedicacion, searchTerm, this.datepipe));
    const total = dedicaciones.length;

    // 3. paginate
    dedicaciones = dedicaciones.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({dedicaciones, total});
  }
}

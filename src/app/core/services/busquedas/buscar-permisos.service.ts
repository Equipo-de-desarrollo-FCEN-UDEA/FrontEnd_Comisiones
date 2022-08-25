import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Permiso} from '@interfaces/permisos';
import {DatePipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from "@shared/directivas/sortable.directive";
import { ultimoElement } from "@shared/clases/ultimo-estado";
import { PermisoService } from '../permisos/permiso.service';

export type SortColumn = keyof Permiso | "";

interface SearchResult {
  permisos: Permiso[];
  total: number;
  
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: any | string, v2: string|any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(permisos: Permiso[], column: SortColumn, direction: string ): Permiso[] {
  if (direction === '' || column === '') {
    return permisos;
  } else {
    return [...permisos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(permisos: Permiso, term: string, datepipe: DatePipe) {

  return (
    permisos.tipos_permiso.nombre.toLowerCase().includes(term.toLowerCase()) ||
    ultimoElement(permisos.intermediate_permisos)?.intermediate_estados.nombre.toLowerCase().includes(term)||
    datepipe.transform(ultimoElement(permisos.intermediate_permisos)?.createdAt)?.includes(term)  ||
    permisos.usuarios.nombre.toLowerCase().includes(term) ||
    permisos.usuarios.apellido.toLowerCase().includes(term) ||
    permisos.usuarios.departamentos.nombre.toLowerCase().includes(term) ||
    permisos.usuarios.departamentos.facultades.nombre.toLocaleLowerCase().includes(term) 
    //|| datepipe.transform(ultimoElement(comisiones.intermediate_comisiones).created_at, 'd MMM y')
  );
}

@Injectable({providedIn: 'root'})

export class BuscarPermisosService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _permisos$ = new BehaviorSubject<Permiso[]>([]);
  private _total$ = new BehaviorSubject<number>(0);


  private _state: State = {
    page: 1,
    pageSize: 7,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  PERMISOS : Permiso[] = [];
  
  archivado$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  

  constructor(
    private permisosSvc: PermisoService,
    private datepipe: DatePipe
  ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._permisos$.next(result.permisos);
      this._total$.next(result.total);

      
      
    });

    this._search$.next();

  

    this.permisosSvc.scopegetPermisos(this.archivado$.getValue())
    .subscribe(
      (resp: any) => {
        this.PERMISOS = resp.permisos;
      }
    )
   }

   archivados(archivado: number){
    this.archivado$.next(archivado);
    
   }

   ngOnchanges(){

    if (this.archivado$) {
      
    }
    this.permisosSvc.scopegetPermisos(this.archivado$.getValue())
    .subscribe(
      (resp: any) => {
        this.PERMISOS = resp.permisos;
        this._permisos$.next(this.PERMISOS);
        this._search$.next();
      }
    )
   }

   get permisos$() { return this._permisos$.asObservable(); }
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
    let permisos = sort(this.PERMISOS, sortColumn, sortDirection);
    
    console.log(permisos)
    // 2. filter
    permisos = permisos.filter(permisos => matches(permisos, searchTerm, this.datepipe));
    const total = permisos.length;


    // 3. paginate
    permisos = permisos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({permisos, total});

    
  }






}

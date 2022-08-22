import { Injectable } from '@angular/core';

import { Usuario } from "@interfaces/usuario";
import { UsuarioService } from "@services/usuarios/usuario.service";
import {SortDirection} from '@shared/directivas/sortable.directive';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

type SortColumn = keyof Usuario | "";

interface SearchResult{
  usuarios: Usuario[];
  total:number;
}

interface State{
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | any, v2: string | any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(usuarios: Usuario[], column: SortColumn, direction: string): Usuario[] {
  if (direction === '' || column === '') {
    return usuarios;
  } else {
    return [...usuarios].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(usuarios: Usuario, term: string, datepipe: DatePipe) {

  return (
    usuarios.nombre.toLowerCase().includes(term) 
  );
} 

@Injectable({ providedIn: 'root' })

export class BuscarUsuariosService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _usuarios$ = new BehaviorSubject<Usuario[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  USUARIOS: Usuario[] = [];


  constructor(
    private usuariosSvc: UsuarioService,
    private datepipe: DatePipe
    ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._usuarios$.next(result.usuarios);
      this._total$.next(result.total);
    });

    this._search$.next();
    this.usuariosSvc.getAllUsuarios()
    .subscribe(
      (comisiones: Usuario[]) => {
        this.USUARIOS = comisiones;
      }
    )
  }

  get usuarios$() { return this._usuarios$.asObservable(); }
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
    let usuarios = sort(this.USUARIOS, sortColumn, sortDirection);

<<<<<<< HEAD
    console.log(usuarios)

=======
>>>>>>> main
    // 2. filter
    usuarios = usuarios.filter(usuarios => matches(usuarios, searchTerm, this.datepipe));
    const total = usuarios.length;


    // 3. paginate
    usuarios = usuarios.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({usuarios, total});
  }

}


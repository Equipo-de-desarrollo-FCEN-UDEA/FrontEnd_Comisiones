import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ComisionEstados } from "../interfaces/comisionesxestado";

@Injectable({
  providedIn: 'root'
})
export class ComisionxestadoService {

  private urlEndPoint:string = 'http://localhost:5200/api/comisiones-estados';

  constructor( private http : HttpClient) { }

  getComisionxEstado() {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as ComisionEstados[])
    ) }
}
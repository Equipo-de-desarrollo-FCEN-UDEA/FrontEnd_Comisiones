import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { prefix } from '@shared/data/ruta-api';

// import { ComisionEstados } from "../interfaces/comisionesxestado";

@Injectable({
  providedIn: 'root'
})
export class ComisionxestadoService {

  private urlEndPoint:string = prefix+'comisiones-estados';

  constructor( private http : HttpClient) { }

  getComisionxEstado() {
    // return this.http.get(this.urlEndPoint).pipe(
    //   map((response) => response as ComisionEstados[])
    // ) }
}
}
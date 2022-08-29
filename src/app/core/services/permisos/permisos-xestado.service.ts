import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class PermisosXEstadoService {

  private urlEndPoint:string = prefix+'permisos-estados';
  
  constructor( private http : HttpClient) { }

  postPermisoxEstado(id: string | number, estado: any){

    return this.http.post(`${this.urlEndPoint}/${id}`, estado);

  }
}

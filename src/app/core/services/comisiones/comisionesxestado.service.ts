import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';
import { ComisionesXEstadoInDB } from '@interfaces/comisionesxestado';

// import { ComisionEstados } from "../interfaces/comisionesxestado";

@Injectable({
  providedIn: 'root'
})
export class ComisionxestadoService {

  private urlEndPoint:string = prefix+'comisiones-estados';

  constructor( private http : HttpClient) { }

  getComisionxEstado() {
  
  }

  postComisionxEstado(id: string | number, estado: any){
    return this.http.post< ComisionesXEstadoInDB >(`${this.urlEndPoint}/${id}`, estado);
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class DedicacionxestadoService {

  private urlEndPoint : string = prefix + 'dedicaciones-estados' 

  constructor(
    private http: HttpClient
  ) { }

  postDedicacionxEstado(id: string, estado: any){
    return this.http.post<any>(`${this.urlEndPoint}/${id}`, estado)
  }
}

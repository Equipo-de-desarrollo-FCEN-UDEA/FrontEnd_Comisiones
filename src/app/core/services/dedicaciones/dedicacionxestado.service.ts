import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class DedicacionxestadoService {

  private urlEndPoint : string = prefix + 'solicitar-dedicacion' 

  constructor(
    private http: HttpClient
  ) { }

  postDedicacionxEstado(id: string | number){
    return this.http.post<any>(`${this.urlEndPoint}/${id}`,null)
  }

}

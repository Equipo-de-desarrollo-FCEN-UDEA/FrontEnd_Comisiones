import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '@interfaces/estados';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(
    private http: HttpClient
  ) { }

  private urlEndPoint:string = prefix+'estados';
  getEstados(){
    return this.http.get<Estado[]>(this.urlEndPoint);
  }

}

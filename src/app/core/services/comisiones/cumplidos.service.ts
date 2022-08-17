import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';
import { Cumplido } from '@interfaces/cumplidos';

@Injectable({
  providedIn: 'root'
})
export class CumplidosService {

  constructor( private http: HttpClient ) { }

  private urlEndPoint:string = prefix+'cumplidos';

  subirCumplido(cumplido:any){
    return this.http.post<Cumplido>(this.urlEndPoint ,cumplido);
  }

}

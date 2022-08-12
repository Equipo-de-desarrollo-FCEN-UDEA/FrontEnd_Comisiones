import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoComision } from '@interfaces/tipos_comision'; 
import { HttpClient } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class TipoComisionService {

  private urlEndPoint:string = prefix + 'tipos-comision';

  constructor(private http: HttpClient) {}

  getTipoSolicitud(): Observable<TipoComision[]> {
    return this.http.get<TipoComision[]>(this.urlEndPoint);
  }
}

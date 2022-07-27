

import { Injectable } from '@angular/core';
import { Observable, of, map, pipe, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';
import { Comision } from '@interfaces/comisiones';



@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private _comisiones$ = new BehaviorSubject<Comision[]>([]);
  private urlEndPoint:string = prefix+'comisiones';
  

  constructor(private http: HttpClient) { }

  buscarComisiones():Observable<Comision[]> {
    return this.http.get<Comision[]>(this.urlEndPoint)
    
    
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartamentoInDB } from '@interfaces/departamentos';
import { prefix } from '@shared/data/ruta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlEndPoint:string = prefix+'departamentos';

  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<DepartamentoInDB[]> {
    return this.http.get<DepartamentoInDB[]>(this.urlEndPoint)
  }
}

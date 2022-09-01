import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol, RolResponse } from '@interfaces/roles';
import { prefix } from '@shared/data/ruta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint:string = prefix +'roles';

  constructor(private http: HttpClient) { }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlEndPoint);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolResponse } from '@interfaces/roles';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
   private http: HttpClient
  ) { }

  prefix = prefix

  getRoles() {
    return this.http.get<RolResponse>(this.prefix+'roles');
  }
    

}

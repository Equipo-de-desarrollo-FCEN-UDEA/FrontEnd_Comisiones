import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiposPermiso } from '@interfaces/tipos_permiso';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class TipoPermisoService {


  private urlEndPoint:string = prefix + 'tipos-permiso'

  constructor(private http: HttpClient) { }

  getTiposPermiso(){
    return this.http.get<TiposPermiso[]>(this.urlEndPoint)
  }

  getTipoPermisoId(id:number){
    return this.http.get<TiposPermiso>(`${this.urlEndPoint}/${id}`)
  }
}

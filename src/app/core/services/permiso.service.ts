import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permiso, PermisosInside } from '@interfaces/permisos';
import { prefix } from '@shared/data/ruta-api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private urlEndPoint:string = prefix+'permisos';

  constructor( private http: HttpClient) { }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.urlEndPoint)
  }


  getPermiso(id: string): Observable<any> {
    return this.http.get<PermisosInside>(`${this.urlEndPoint}/${id}`).pipe(
      map((res) => {
        return res;
      })
    ); 
  }

  delete(id: any): Observable<any> {
    return this.http.delete<PermisosInside>(`${this.urlEndPoint}/${id}`);
  }

  updateSolicitud(id: string, data: PermisosInside): Observable<any> {
    return this.http.patch<PermisosInside>(`${this.urlEndPoint}/${id}`, data);
  }
}

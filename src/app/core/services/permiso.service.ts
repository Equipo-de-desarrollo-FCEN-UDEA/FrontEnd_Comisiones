import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermisosInside } from '@interfaces/permisos';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(
    private http: HttpClient
  ) { }
  
  private urlEndPoint = 'http://localhost:3000/api/permisos';

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

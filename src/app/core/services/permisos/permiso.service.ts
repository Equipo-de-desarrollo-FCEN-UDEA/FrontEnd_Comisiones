
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Permiso, PermisosDTO, PermisosInside } from '@interfaces/permisos';
import { prefix } from '@shared/data/ruta-api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private urlEndPoint:string = prefix+'permisos';

  constructor( private http: HttpClient) { }

<<<<<<< HEAD
  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.urlEndPoint)
=======
  getPermisos(archivado: number): Observable<Permiso[]> {
    let params = archivado !=2 ? new HttpParams().append("archivado", archivado) : new HttpParams();
    return this.http.get<Permiso[]>(this.urlEndPoint, {
      params:params
    })
>>>>>>> main
  }


  getPermiso(id: string | number): Observable<any> {
    return this.http.get<PermisosInside>(`${this.urlEndPoint}/${id}`).pipe(
      map((res) => {
        return res;
      })
    ); 
  }

<<<<<<< HEAD
  postPermiso(permiso:any) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
    const body = `
    archivo=${permiso.archivos?[0] : null}
    &fecha_inicio=${permiso.fecha_inicio}
    &fecha_fin=${permiso.fecha_fin}
    &fecha_resolucion=${permiso.fecha_resolucion}
    &justificacion=${permiso.justificacion}
    &tipos_permiso_id=${permiso.tipos_permiso_id}
    &usuarios_id=${permiso.usuarios_id} 
    ` 
    return this.http.post(this.urlEndPoint, body, {headers: headers}).pipe(
      map((res)=> {
        return res;
      })
    );
  }

  patchPermiso(id: string | number, permiso:any): void {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
    const body = `
    archivo=${permiso.archivos?[0] : null}
    &fecha_inicio=${permiso.fecha_inicio}
    &fecha_fin=${permiso.fecha_fin}
    &fecha_resolucion=${permiso.fecha_resolucion}
    &justificacion=${permiso.justificacion}
    &tipos_permiso_id=${permiso.tipos_permiso_id}
    &usuarios_id=${permiso.usuarios_id} 
    `
    this.http.patch(`${this.urlEndPoint}/${id}`, body, {headers: headers}).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
=======
>>>>>>> main

  delete(id: string | number): Observable<any> {
    return this.http.delete<PermisosInside>(`${this.urlEndPoint}/${id}`);
  }


  crearPermiso(permiso:any) {

    return this.http.post<PermisosDTO>(this.urlEndPoint, permiso);
  }


<<<<<<< HEAD
  updatePermiso(id: string, paramList:any, files: File[], permiso:any): Observable<any> {
=======
  editarPermiso(id: string, paramList:any, files: File[], permiso:any): Observable<any> {
>>>>>>> main

    // En el back: /api/permisoes/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    permiso.archivo = files;

    return this.http.patch<PermisosDTO>(`${this.urlEndPoint}/${id}`, permiso, {params: params});
<<<<<<< HEAD
=======

>>>>>>> main
  }
}

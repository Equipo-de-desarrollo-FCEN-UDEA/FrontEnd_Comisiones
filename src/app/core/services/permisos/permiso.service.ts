
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permiso, PermisosDTO, PermisosInside } from '@interfaces/permisos';
import { prefix } from '@shared/data/ruta-api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private urlEndPoint:string = prefix +'permisos';
  private urlEndPointArch:string = prefix +'archivarpermiso';
  
  constructor( private http: HttpClient) { }
  
  scopeGetPermisos(archivado: number, offset ?: number, limit ?: number ): Observable<any> {
    let params = new HttpParams()
    
    if (archivado != 2 ){
      params = params.append('archivado', archivado);
    }
    
    // params = params.append('offset', offset? offset : 0);
    // params = params.append('limit', limit? limit: 10);

    console.log(params+" parametros")
    
    return this.http.get<Permiso[]>(`${this.urlEndPoint}`, {
      params:params
      
    })
  }

  getNextPermiso(){

  }

  getPreviousPermiso(){

  }
 
 getPermiso(id: string | number): Observable<any> {
    return this.http.get<PermisosInside>(`${this.urlEndPoint}/${id}`).pipe(
      map((res) => {
        return res;
      })
    ); 
  }

  Archivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:1})
    
  }

  NoArchivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:0})
  }


  deletePermiso(id: string | number): Observable<any> {
    return this.http.delete<PermisosInside>(`${this.urlEndPoint}/${id}`);
  }


  postPermiso(permiso:any) {
    return this.http.post<PermisosDTO>(this.urlEndPoint, permiso);
  }


  updatePermiso(id: string, paramList:any, files: File[], permiso:any): Observable<any> {
    // En el back: /api/permisoes/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    permiso.archivo = files;

    return this.http.patch<PermisosDTO>(`${this.urlEndPoint}/${id}`, permiso, {params: params});

  }
}

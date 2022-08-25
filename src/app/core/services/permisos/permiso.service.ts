
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
  getPermisos: any;

  constructor( private http: HttpClient) { }



  
  
  scopegetPermisos(archivado: number): Observable<any> {
    let params = new HttpParams()
    // .set('archivado', archivado)
    // .set("offset", 0)
    // .set('limit', 100)

    if (archivado != 2 ){
      params = params.append('archivado', archivado);
    }
    params = params.append('offset', 0);
    params = params.append('limit', 100);

    console.log(params+"  parametros")

    return this.http.get<Permiso[]>(`${this.urlEndPoint}`, {
      params:params
      
    } 
    
      
    )

    
    


    // if (archivado != 2) {
      
     
     

    // }else{
    //   const params = new HttpParams()
    //  params.set('archivado', archivado)
     
    // }

    
    // let params = archivado !=2 ? new HttpParams()
    // .set("archivado", archivado)
    // .set('archivado', archivado)
    // .set("offset", 0)
    // .set('limit', 100) : new HttpParams()
    
    // let params = archivado !=2 ? new HttpParams()
       
    

    // this.http.get<Permiso>(`${this.urlEndPoint}/`)

    // if (archivado != 2 ) {
    // params.append("archivado", archivado),
    // params.append("offset", 0) }
    
    // params.append("limit", 100)
   
  }

  // scopegetPermisos(offset:number,limit:number,archivado: number): Observable<Permiso[]> {
  //   let params = archivado !=2 ? new HttpParams().append("archivado", archivado): new HttpParams();
  //   return this.http.get<Permiso[]>(this.urlEndPoint, {
  //     params:params
  //   })
  // }
  



  getPermiso(id: string | number): Observable<any> {
    return this.http.get<PermisosInside>(`${this.urlEndPoint}/${id}`).pipe(
      map((res) => {
        return res;
      })
    ); 
  }


  delete(id: string | number): Observable<any> {
    return this.http.delete<PermisosInside>(`${this.urlEndPoint}/${id}`);
  }


  crearPermiso(permiso:any) {

    return this.http.post<PermisosDTO>(this.urlEndPoint, permiso);
  }


  editarPermiso(id: string, paramList:any, files: File[], permiso:any): Observable<any> {

    // En el back: /api/permisoes/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    permiso.archivo = files;

    return this.http.patch<PermisosDTO>(`${this.urlEndPoint}/${id}`, permiso, {params: params});

  }
}

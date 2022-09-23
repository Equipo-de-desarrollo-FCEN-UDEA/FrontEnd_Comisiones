
import { Comision, ComisionDTO } from '@interfaces/comisiones';
import { Injectable } from '@angular/core';
import { Observable, of, map, pipe } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  
  private urlEndPoint:string = prefix+'comisiones';
  private urlEndPointArch:string = prefix +'archivarcomision';
  
  constructor( private http: HttpClient) { }

  scopeGetComisiones(archivado: number): Observable<any> {
    let params = new HttpParams()
    
    if (archivado != 2 ){
      params = params.append('archivado', archivado);
    }
    
    params = params.append('offset', 0);
    params = params.append('limit', 100);

    return this.http.get<Comision[]>(`${this.urlEndPoint}`, {
      params:params
    })
  }

  // getComisiones(): Observable<Comision[]> {
  //   return this.http.get<Comision[]>(this.urlEndPoint)
  // }
  
  getComision(id: string | number) {
    return this.http.get<Comision>(`${this.urlEndPoint}/${id}`)
    .pipe(
      map((res=> {
        return res
      }))
    )
  }

  Archivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:1})
  }

  NoArchivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:0})
  }
  
  postComision(comision:any) {
    return this.http.post<ComisionDTO>(this.urlEndPoint, comision);
  }

  updateComision(id: string, paramList:any, files: File[], comision:any): Observable<any> {

    // En el back esta como: /api/comisiones/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    comision.archivo = files;

    return this.http.patch<ComisionDTO>(`${this.urlEndPoint}/${id}`, comision, {params: params});
  }

  deleteComision(id: string | number): Observable<ComisionDTO> {
    return this.http.delete<ComisionDTO>(`${this.urlEndPoint}/${id}`);
  }


}





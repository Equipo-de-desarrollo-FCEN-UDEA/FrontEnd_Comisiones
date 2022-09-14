import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { prefix } from '@shared/data/ruta-api';
import { FormatoVice } from '@interfaces/dedicaciones/formatovice';
import { Dedicacion, DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DedicacionService {

 private urlEndPoint:string= prefix + 'dedicaciones';
 private urlEndPointArch:string = prefix +'archivardedicacion';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  getDedicaciones(){
    // let params = new HttpParams()
    // if (archivado != 2 ){
    //   params = params.append('archivado', archivado);
    // }
    
    // params = params.append('offset', 0);
    // params = params.append('limit', 100);
    return this.http.get(this.urlEndPoint)
  }

  

  Archivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:1})
  }

  NoArchivado(id:number): Observable<any>{
    return this.http.patch(`${this.urlEndPointArch}/${id}`, {archivado:0})
  }

  postDedicacion(description: string) {
    return this.http.post(`${this.urlEndPoint}`, { descripcion:description })
  }

  getDedicacion(id: number | string) {
    return this.http.get<DedicacionDTO>(`${this.urlEndPoint}/${id}`)
  }

  deleteDedicacion(id:number) {
    return this.http.delete(`${this.urlEndPoint}/${id}`)
  }


}

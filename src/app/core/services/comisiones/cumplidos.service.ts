import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';
import { Cumplido, CumplidoDTO } from '@interfaces/cumplidos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CumplidosService {

  constructor( private http: HttpClient ) { }

  private urlEndPoint:string = prefix+'cumplidos';

  getCumplido(id: string | number){
    return this.http.get<Cumplido>(`${this.urlEndPoint}/${id}`)
  }

  
  postCumplido(cumplido:any){
    return this.http.post<Cumplido>(this.urlEndPoint ,cumplido);
  }


  updateCumplido(id: string, paramList:any, files: File[], cumplido:any): Observable<any> {

    // En el back esta como: /api/cumplidos/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    cumplido.archivo = files;

    return this.http.patch<CumplidoDTO>(`${this.urlEndPoint}/${id}`, cumplido, {params: params});
  }

    
  deleteCumplido(id: string | number): Observable<CumplidoDTO> {
    return this.http.delete<CumplidoDTO>(`${this.urlEndPoint}/${id}`);
  }

}

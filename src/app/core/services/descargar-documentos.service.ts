import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescargarDocumentosService {

  private urlEndPoint:string = prefix+'documento_download';

  constructor(private http: HttpClient) { }

  descargarDocumento(id: string | number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`)
  }
  
}

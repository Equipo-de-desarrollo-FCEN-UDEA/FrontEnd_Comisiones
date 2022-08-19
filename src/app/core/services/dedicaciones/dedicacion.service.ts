import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { prefix } from '@shared/data/ruta-api';
import { FormatoVice } from '@interfaces/dedicaciones/formatovice';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';

@Injectable({
  providedIn: 'root'
})
export class DedicacionService {

 private prefix : string = prefix + 'dedicaciones';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {

  }

  postDedicacion(description: string) {
    return this.http.post(`${this.prefix}`, { descripcion:description })
  }

  getDedicacion(id: number | string) {
    return this.http.get<DedicacionDTO>(`${this.prefix}/${id}`)
  }

  deleteDedicacion(id:number) {
    return this.http.delete(`${this.prefix}/${id}`)
  }


}

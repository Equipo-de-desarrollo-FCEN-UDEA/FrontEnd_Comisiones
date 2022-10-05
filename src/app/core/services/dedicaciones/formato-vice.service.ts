import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';
import { FormatoVice } from '@interfaces/dedicaciones/formatovice';
import * as saveAs from 'file-saver';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatoViceService {

  private prefix = prefix + 'formatosvice'

  constructor(
    private http: HttpClient
  ) { }

  postFormulario(dexclusiva: FormatoVice) {

    var body = dexclusiva

    console.log(body)

    return this.http.post(this.prefix, body);
  }

  getFormatoVice(id:number) {
   return this.http.get<any>(this.prefix+`/${id}`)
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta-api';
import { FormatoVice, FormatoVicedocencia } from '@interfaces/dedicaciones/formatovice';
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

  postFormulario(body: any) {

    let reqBody: FormData = new FormData();

    reqBody.append('tiempo_solicitado', body.tiempo_solicitado)
    reqBody.append('campo_modalidad', body.campo_modalidad)
    reqBody.append('descripcion_comprobante', body.descripcion_comprobante)
    reqBody.append('metas_productos', JSON.stringify(body.metas_productos))
    reqBody.append('acciones', JSON.stringify(body.acciones))
    reqBody.append('objetivos_has_indicador', JSON.stringify(body.objetivos_has_indicador))
    reqBody.append('dedicaciones_id', body.dedicaciones_id)


    return this.http.post(this.prefix, reqBody);
  }

  getFormatoVice(id: number) {
    return this.http.get<FormatoVicedocencia>(this.prefix + `/${id}`)
  }


  patchFotmato(
    id: number,
    body: any,
    pathAcciones: number[],
    pathIndicadores: number[],
    pathMetasProductos: number[]
  ) {

    let params = new HttpParams();

    params = params.append('acciones', JSON.stringify(pathAcciones))
    params = params.append('indicadores', JSON.stringify(pathIndicadores))
    params = params.append('metas_productos', JSON.stringify(pathMetasProductos))

    let reqBody: FormData = new FormData();

    reqBody.append('tiempo_solicitado', body.tiempo_solicitado)
    reqBody.append('campo_modalidad', body.campo_modalidad)
    reqBody.append('descripcion_comprobante', body.descripcion_comprobante)
    reqBody.append('metas_productos', JSON.stringify(body.metas_productos))
    reqBody.append('acciones', JSON.stringify(body.acciones))
    reqBody.append('objetivos_has_indicador', JSON.stringify(body.objetivos_has_indicador))

    return this.http.patch(this.prefix +`/${id}`, reqBody, {params:params})

  }

}

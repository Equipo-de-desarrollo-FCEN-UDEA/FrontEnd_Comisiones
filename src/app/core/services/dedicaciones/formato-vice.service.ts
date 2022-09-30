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

  postFormulario(dexclusiva: FormatoVice , id: number | string) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Response-Type': 'blob'
      }
    );
    var body = `extension_oficina=${dexclusiva.extension_oficina}
    &celular=${dexclusiva.celular}
    &titulo=${dexclusiva.titulo}
    &tiempo_solicitado=${dexclusiva.tiempo_solicitado}
    &campo_modalidad=${dexclusiva.campo_modalidad}
    &descripcion_comprobante=${dexclusiva.descripcion_comprobante}
    &tema_estrategico=${JSON.stringify(dexclusiva.tema_estrategico.map((x: any) => x.tema))}
    &objetivo_estrategico_desarrollo=${JSON.stringify(dexclusiva.objetivo_estrategico_desarrollo.map((x: any) => x.objEstrategico))}
    &metas=${JSON.stringify(dexclusiva.metas.map((x: any) => x.meta))}
    &acciones_estrategicas=${ JSON.stringify(dexclusiva.acciones_estrategicas.map((x: any) => x.accion))}
    &objetivo_estrategico_institucional=${JSON.stringify(dexclusiva.objetivo_estrategico_institucional.map((x: any) => x.objetivo))}
    &indicador=${JSON.stringify(dexclusiva.indicador.map((x: any) => x.indicador))}
    &productos=${JSON.stringify(dexclusiva.productos.map((x: any) => x.producto))}
    &dedicaciones_id=${id}
    `;

    return this.http.post(this.prefix, body, {
      observe: 'response',
      responseType: 'blob',
      headers: headers
    }).pipe(
      tap(
        (content: any) => {
          const blob = new Blob([content.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'formato-dedicacion-exclusiva.xlsx');
        }
      ),
      map(
        () => true
      )
    );
  }

  getFormatoVice(id:number) {
   return this.http.get<any>(this.prefix+`/${id}`)
  }
}

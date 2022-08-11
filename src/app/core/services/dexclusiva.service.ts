import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class DexclusivaService {

 private prefix : string = prefix + 'dedicaciones';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {

  }

  // getDexclusiva() {
  //   return this.http.get('http://localhost:3000/dexclusiva');
  // }

  postDexclusiva(dexclusiva: any) {
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
    `;
    return this.http.post(`${this.prefix}`, body, {
      observe: 'response',
      responseType: 'blob',
      headers: headers
    }).pipe(
      tap(
        (content: any) => {
          console.log(content.body);
          const blob = new Blob([content.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'dexclusiva.xlsx');
        }
      ),
      map(
        () => true
      )
    );
  }

}

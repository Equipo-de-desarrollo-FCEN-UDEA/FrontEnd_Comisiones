
import { Comision, ComisionDTO } from '../interfaces/comisiones';


import { Injectable } from '@angular/core';
import { Observable, of, map, pipe } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';



@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  private urlEndPoint:string = prefix+'comisiones';


  constructor( private http: HttpClient) { }

  getComisiones(): Observable<Comision[]> {
    return this.http.get<Comision[]>(this.urlEndPoint)
  }
  
  getComision(id: string | number) {
    return this.http.get<Comision>(`${this.urlEndPoint}/${id}`)
    // .pipe(
    //   map((res) => {
        
    //   })
    // )
  }
  
  delete(id: string | number): Observable<ComisionDTO> {
    return this.http.delete<ComisionDTO>(`${this.urlEndPoint}/${id}`);
  }

  
  crearComision(comision:any, archivos:any) {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'multipart/form-data',
      }
    );
    
    // const body = `
    // archivo=${comision.archivos[0]}
    // &fecha_inicio=${comision.fecha_inicio}
    // &fecha_fin=${comision.fecha_fin}
    // &fecha_resolucion=${comision.fecha_resolucion}
    // &justificacion=${comision.justificacion}
    // &idioma=${comision.idioma}
    // &lugar=${comision.pais+', '+comision.estado+', '+comision.ciudad}
    // &tipos_comision_id=${comision.tipos_comision_id}
    // `  
    //&usuarios_id=${comision.usuarios_id}  usuario?????, se maneja desde el back 
    //


    //{headers: headers}
    console.log("body:", comision);

    const reqBody: FormData = new FormData();
    reqBody.append('tipos_comision_id', comision.tipos_comision_id);
    reqBody.append('fecha_inicio', comision.fecha_inicio);
    reqBody.append('fecha_fin', comision.fecha_fin);
    reqBody.append('justificacion', comision.justificacion);
    reqBody.append('idioma', comision.idioma);
    reqBody.append('lugar', comision.lugar);
    reqBody.append('archivo', new Blob([JSON.stringify(archivos)], {
      type: 'application/json'
    }));

    return this.http.post<ComisionDTO>(this.urlEndPoint, reqBody);
  }


  /**
   * 
   * body: {
    tipos_comision_id: '2',
    fecha_inicio: '2022-09-10',
    fecha_fin: '2022-09-17',
    justificacion: 'alpaca alpaca alpaca alpaca alpaca alpaca ',
    idioma: 'alpacuno',
    lugar: 'Albania, '
  },
  files: [Object: null prototype] {
    archivo: {
      name: 'blob',
      data: <Buffer 5b 7b 7d 5d>,
      size: 4,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/json',
      md5: 'a21cafb4c405e6997671a02e578b9b1e',
      mv: [Function: mv]
    }
  },
  
  
  ------

body: {
    fecha_inicio: '2022-02-20',
    fecha_fin: '2022-02-21',
    fecha_resolucion: '2022-02-20',
    resolucion: '1111',
    justificacion: 'sdlkfjasñdlkfjsañdlkfjasñdlkfjñaslkdjfñlkdsajfñlksadjfñlaksdjfñlksadjfñlkssalkdjfañslkdjfñalskdjfñaslkdjfñaslkdjfñalskjfdsaldkfjlskdjfslk',
    idioma: 'blabla',
    lugar: 'blabla',
    tipos_comision_id: '1'
  },
  files: [Object: null prototype] {
    archivo: {
      name: 'Spectrum Tutorial — Pyrat Bay 1.0.2 documentation.pdf',
      data: <Buffer 25 50 44 46 2d 31 2e 34 0a 25 d3 eb e9 e1 0a 31 20 30 20 6f 62 6a 0a 3c 3c 2f 43 72 65 61 74 6f 72 20 28 4d 6f 7a 69 6c 6c 61 2f 35 2e 30 20 5c 28 4d ... 1152800 more bytes>,
      size: 1152850,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/json',
      md5: '1c723a940ee40373c35c98dd3c75da38',
      mv: [Function: mv]
    }
  
  */


  updateComision(id: string, paramList:any, files: File[], comision:ComisionDTO): Observable<any> {

    // back: /api/comisiones/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    comision.archivo = files;

    return this.http.patch(`${this.urlEndPoint}/${id}`, comision, {params: params});
  }


}





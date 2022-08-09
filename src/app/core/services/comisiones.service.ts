
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
    reqBody.append('files', archivos)
    reqBody.append('body', new Blob([JSON.stringify(comision)], {
      type: 'application/json'
    }), );

    return this.http.post<ComisionDTO>(this.urlEndPoint, reqBody);
  }


  /**
   * body: { files: '[object File]' },
  files: [Object: null prototype] {
    body: {
      name: 'blob',
      data: <Buffer 7b 22 66 65 63 68 61 5f 69 6e 69 63 69 6f 22 3a 22 32 30 32 32 2d 30 39 2d 31 31 22 2c 22 66 65 63 68 61 5f 66 69 6e 22 3a 22 32 30 32 32 2d 30 39 2d ... 230 more bytes>,
      size: 280,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/json',
      md5: '73c37103d92264ac7acb9338b4cc2ad2',
      mv: [Function: mv]
    }
  }, 
  
  
  ------

  body: {
    fecha_inicio: '2022-08-07T05:00:00.000Z',
    fecha_fin: '2022-08-07T05:00:00.000Z',
    justificacion: 'no se pa que',
    idioma: 'esperanto',
    lugar: 'aqui',
    id: 20
  },
  files: [Object: null prototype] {
    archivo: {
      name: '847521381-MIT.pdf',
      data: <Buffer 25 50 44 46 2d 31 2e 35 0d 25 e2 e3 cf d3 0d 0a 33 35 30 30 20 30 20 6f 62 6a 0d 3c 3c 2f 4c 69 6e 65 61 72 69 7a 65 64 20 31 2f 4c 20 39 38 39 39 39 ... 9899917 more bytes>,
      size: 9899967,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/json',
      md5: '37d673e798e33747fea91575422602eb',
      mv: [Function: mv]
    }
  },
  
  */


  updateComision(id: string, paramList:any, files: File[], comision:ComisionDTO): Observable<any> {

    // back: /api/comisiones/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    comision.archivo = files;

    return this.http.patch(`${this.urlEndPoint}/${id}`, comision, {params: params});
  }


}





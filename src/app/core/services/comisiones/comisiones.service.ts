
import { Comision, ComisionDTO } from '@interfaces/comisiones';


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
  }
  
  crearComision(comision:any) {

    return this.http.post<ComisionDTO>(this.urlEndPoint, comision);

  //crearComision(comision:Partial<ComisionDTO> | any) {
    //const headers = new HttpHeaders(
      //{
      //  'Content-Type': 'application/x-www-form-urlencoded',
     // }
    //)
    
    //const body = `
    //archivo=${comision.archivos?[0] : null}
    //&fecha_inicio=${comision.fecha_inicio}
    //&fecha_fin=${comision.fecha_fin}
    //&fecha_resolucion=${comision.fecha_resolucion}
    //&justificacion=${comision.justificacion}
    //&idioma=${comision.idioma}
    //&lugar=${comision.lugar}
    //&tipos_comision_id=${comision.tipos_comision_id}
    //&usuarios_id=${comision.usuarios_id} 
    //`  //usuario?????, se maneja desde el back 

    //return this.http.post(this.urlEndPoint, body, {headers: headers}).pipe(
     // map((res)=> {
       // return res;
      //})
    //);

  }


  updateComision(id: string, paramList:any, files: File[], comision:any): Observable<any> {

    // En el back: /api/comisiones/:id?request=[idDoc]
    
    const params = new HttpParams().set('require', paramList);
    comision.archivo = files;

    return this.http.patch<ComisionDTO>(`${this.urlEndPoint}/${id}`, comision, {params: params});
  }

    
  delete(id: string | number): Observable<ComisionDTO> {
    return this.http.delete<ComisionDTO>(`${this.urlEndPoint}/${id}`);
  }



}




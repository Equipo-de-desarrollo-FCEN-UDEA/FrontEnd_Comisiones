
import { Comision, ComisionDTO } from '../interfaces/comisiones';


import { Injectable } from '@angular/core';
import { Observable, of, map } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { prefix } from '@shared/data/ruta-api';
import { Comision } from '@interfaces/comisiones';



@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  private urlEndPoint:string = prefix+'comisiones';


  constructor( private http: HttpClient) { }

  getComisiones(): Observable<any> {

    // return this.http.get<Comision[]>(this.urlEndPoint)

    return this.http.get<Comision[]>(this.urlEndPoint).pipe(
      map((res) => {
        const comision = res as Comision[];
        return comision.map((newComision) => {
          console.log(newComision);

          const lenEstados = newComision.intermediate_comisiones.length;

          console.log(lenEstados);

          const final_estado = newComision.intermediate_comisiones[lenEstados - 1]
          ['intermediate_estados']['nombre'];

          newComision.nombreEstadoActual = final_estado;
          return newComision
        });
      })
    )
    
    // .pipe(
    //    map((resp)=>{
    //      const comision = resp as Comision[];
    //      return comision.map((newComision) => {
    //        console.log(newComision);
    //      })
    //   })
    // );


    
   }

   getComision(id:string) {
      return this.http.get<Comision>(`${this.urlEndPoint}/${id}`).pipe(
        map((res)=> {
          const lenEstados = res.intermediate_comisiones.length;
          console.log(lenEstados)
          const finalEstado = res.intermediate_comisiones[lenEstados-1];
          // res.estadoActual = finalEstado;
          // console.log(res.estadoActual);
          return res;  
        })
      )
   }

   delete(id: any): Observable<any> {
    return this.http.delete<ComisionDTO>(`${this.urlEndPoint}/${id}`);
  }

   crearComision(comision:any) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
    
    const body = `
    archivo=${comision.archivos[0]}
    &fecha_inicio=${comision.fecha_inicio}
    &fecha_fin=${comision.fecha_fin}
    &justificacion=${comision.justificacion}
    &lugar=${comision.lugar}
    &tipos_comision_id=${comision.tipos_comision_id}
    &usuarios_id=${comision.usuarios_id}
    `

    return this.http.post(this.urlEndPoint, body, {headers: headers}).pipe(
      map((res)=> {
        return res;
      })
    );
  }



}





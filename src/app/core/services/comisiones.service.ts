import { Comision } from '../interfaces/comisiones';

import { Injectable } from '@angular/core';
import { Observable, of, map } from "rxjs";
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  private urlEndPoint:string = 'http://localhost:5200/api/comisiones';


  constructor( private http: HttpClient) { }

  getComisiones() {
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
   }

   getComision(id:string) {
      return this.http.get<Comision>(`${this.urlEndPoint}/${id}`).pipe(
        map((res)=> {
          const lenEstados = res.intermediate_comisiones.length;
          console.log(lenEstados)
          const finalEstado = res.intermediate_comisiones[lenEstados-1];
          res.estadoActual = finalEstado;
          console.log(res.estadoActual);
          return res;
          
        })
        
      )
   }


}





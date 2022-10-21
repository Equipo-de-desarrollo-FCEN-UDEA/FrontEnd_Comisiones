import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '@interfaces/dedicaciones/plandesarrollo';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class PlanDesarrolloService {

  private urlEndPoint = prefix + 'temas'

  constructor(
    private http: HttpClient
  ) {

   }


   getPlanDesarrollo() {
    return this.http.get<Tema[]>(this.urlEndPoint)
   }

}

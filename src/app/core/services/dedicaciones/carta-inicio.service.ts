import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carta } from '@interfaces/carta';
import { prefix } from '@shared/data/ruta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaInicioService {

  private prefix = prefix + 'carta';

  constructor(
    private http : HttpClient,
  ) { }

  postCartaInicio(cartaInicio: Carta): Observable<any> {
    return this.http.post<any>(this.prefix, cartaInicio);
  }



}

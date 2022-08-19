import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carta } from '@interfaces/dedicaciones/carta';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class CartaInicioService {

  private prefix = prefix + 'carta'

  constructor(
    private http : HttpClient
  ) { }

  postCarta (carta: Carta) {
  return this.http.post<any>(this.prefix, carta);
  }
    

}

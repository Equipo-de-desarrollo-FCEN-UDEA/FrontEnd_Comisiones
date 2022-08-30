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
    let body : FormData = new FormData();
    body.append('body',carta.body? carta.body: '');
    body.append('dedicaciones_id', `${carta.dedicaciones_id}`);
    body.append('archivo',carta.archivo, `carta_inicio${carta.dedicaciones_id}.pdf`);
  return this.http.post<any>(this.prefix, body);
  }
    

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Pais {
  id: number;
  name: string;
  iso2 : string;
}
interface Ciudad {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaisesCiudadesService {

  

  constructor(
    private http : HttpClient
  ) { }

  getPaises() : Observable<Pais> {
    var headers = new HttpHeaders()
    headers.append("X-CSCAPI-KEY", "API_KEY")
    return this.http.get<Pais>('https://api.countrystatecity.in/v1/countries');
  }

  getCiudades(pais : Pais) : Observable<Ciudad> {
    return this.http.get<Ciudad>(`https://api.countrystatecity.in/v1/countries/${pais.iso2}/cities`);
  }

}

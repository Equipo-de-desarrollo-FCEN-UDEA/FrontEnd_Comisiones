import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Pais, Ciudad, Estado} from '@interfaces/paises-ciudades';



@Injectable({
  providedIn: 'root'
})
export class PaisesCiudadesService {

  

  constructor(
    private http : HttpClient
  ) { }

  private headers = new HttpHeaders(
    {
      'X-CSCAPI-KEY': "TFZ6T0s0NnZhYUc3WUgzY2tEQmRoYXNaaGU4SlpFeTNtTzRGQkROZA=="
    }
  )
  getPaises() : Observable<Pais[]> {
    
    return this.http.get<Pais[]>('https://api.countrystatecity.in/v1/countries',{headers:this.headers} );
  }

  getEstados(pais : Pais) :Observable<Estado[]>{
    return this.http.get<Estado[]>(`https://api.countrystatecity.in/v1/countries/${pais.iso2}/states`,{headers:this.headers});
  }

  getCiudades(pais : Pais, estado : Estado) : Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`https://api.countrystatecity.in/v1/countries/${pais.iso2}/states/${estado.iso2}/cities`,{headers:this.headers});
  }

}

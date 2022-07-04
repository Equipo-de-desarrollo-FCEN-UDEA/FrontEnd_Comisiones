import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioAuth, UsuarioResponse } from '@interfaces/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  prefix = 'http://localhost:3000/api/signin';

  constructor(
    private cookieService : CookieService,
    private http : HttpClient
  ) { 
    
  }

  login(user: UsuarioAuth):Observable<Boolean> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      );
    const body = `email=${user.email}&contrasena=${user.contrasena}`;
    console.log(body);
    return this.http.post<UsuarioResponse>(`${this.prefix}`, body, {headers:headers} )
    .pipe(
    map(
      (response: UsuarioResponse) => {
        if (response.token) {
          this.cookieService.set('token', response.token, 0.000694444);
          this.cookieService.set('usuario', JSON.stringify(response.usuario), 0.000694444);
          return true;
        } else {
          return false;
        }
      }
    ))
    ;
  }
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('usuario');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  getRole(): string {
    return this.cookieService.get('usuario') ? JSON.parse(this.cookieService.get('usuario')).roles_id : '';
  }

}

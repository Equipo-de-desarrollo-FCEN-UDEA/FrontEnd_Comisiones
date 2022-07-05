import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth, UsuarioAuthResponse } from '@interfaces/usuario';
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
    private http : HttpClient,
    private router : Router
  ) { 
    
  }

  login(user: UsuarioAuth):Observable<Boolean> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      );
    const body = `email=${user.email}&contrasena=${user.contrasena}`;
    return this.http.post<UsuarioAuthResponse>(`${this.prefix}`, body, {headers:headers} )
    .pipe(
    map(
      (response: UsuarioAuthResponse) => {
        if (response.token) {
          this.cookieService.set('token', response.token, 1);
          this.cookieService.set('usuario', JSON.stringify(response.usuario), 1);
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
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token') && this.cookieService.check('usuario');
  }

  getRole(): string {
    return this.cookieService.get('usuario') ? JSON.parse(this.cookieService.get('usuario')).roles_id : '';
  }

}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth} from '@interfaces/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '@interfaces/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { prefix } from '@shared/data/ruta-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  prefix = prefix + 'signin';

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
    return this.http.post<Auth>(`${this.prefix}`, body, {headers:headers} )
    .pipe(
    map(
      (response: Auth) => {
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
    if (this.isLoggedIn()) {
      this.logout();
    }
  }

  isLoggedIn(): boolean {
    return true;
    // this.cookieService.check('token') && this.cookieService.check('usuario');
  }

  getRole(): string {
    return this.cookieService.get('usuario') ? JSON.parse(this.cookieService.get('usuario')).roles_id : '';
  }

  forgotPassword(email: string) {
    return this.http.post(``, {
      email,
    });
  }

}


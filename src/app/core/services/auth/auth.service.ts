import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth, UsuarioResponse} from '@interfaces/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '@interfaces/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { prefix } from '@shared/data/ruta-api';
import { UsuarioService } from '@services/usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  prefix = prefix + 'signin';

  constructor(
    private cookieService : CookieService,
    private http : HttpClient,
    private router : Router,
    private usuarioSvc: UsuarioService
  ) { 
    
  }

  login(user: UsuarioAuth):Observable<Auth> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      );
    const body = `correo=${user.correo}&contrasena=${user.contrasena}`;
    return this.http.post<Auth>(`${this.prefix}`, body, {headers:headers} )
    .pipe(
    map(
      (response: Auth) => {
        if (response.token) {
          this.cookieService.set('token', response.token, 1);
          this.cookieService.set('usuario', JSON.stringify(response.usuario), 1);
          this.usuarioSvc.getUsuario().subscribe(
            (usuario: UsuarioResponse) => {
              localStorage.setItem('rol', usuario.roles.nombre);
            }
          )
          return response;
        } else {
          return response;
        }
      }
    ))
    ;
  }


  logout() {

    this.cookieService.delete('token');
    this.cookieService.delete('usuario');
    this.cookieService.deleteAll('/');
    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token') && this.cookieService.check('usuario');
  }

  getRole(): string {
    return this.cookieService.get('usuario') ? JSON.parse(this.cookieService.get('usuario')).roles_id : '';
  }
  
  forgotPassword(correo: string) {
    return this.http.post(`${this.prefix}/restorePassword/${correo}`, {
      correo:correo,
    });
  }

  cambiarContrasena(contrasena: string, newcontrasena: string) {
    return this.http.post(`${this.prefix}/cambiarcontrasena`, {contrasena : contrasena, newcontrasena: newcontrasena})
  }

  

}
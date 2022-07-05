import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private cookie: CookieService,
    private route: Router
  ) { }

  getActualUsuario() {
    if (this.cookie.check('usuario')) {
      return JSON.parse(this.cookie.get('usuario'));
    } else {
      this.route.navigate(['/login']);
    }
  }
}

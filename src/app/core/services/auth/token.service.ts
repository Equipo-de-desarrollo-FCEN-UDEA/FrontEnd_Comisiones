import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private cookie: CookieService,
    private route: Router
  ) { }


  verifyToken() {
    const token = this.cookie.get('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  getToken() {
    if (this.verifyToken()) {
      return this.cookie.get('token');
    } else {
      return this.route.navigate(['/login']);
    }
  }

}

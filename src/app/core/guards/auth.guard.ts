import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     if (this.authService.isLoggedIn()) {
  //       return true;
  //     }
  //     else {
  //       this.route.navigate(['/login']);
  //       return false
  //     }
  // }

  // Controla el acceso a rutas para los usuarios
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.getRole();
    if(currentUser) {
      if(next.data['permissions'] && !this.authService.hasAccessToModule(next.data['permissions'])){
        console.log('paso el guard');
        return false;
      }
      return true;
    }
    
    if (this.authService.isLoggedIn()) {
      console.log('paso el guard');
      // logged in so return true
      return true;
    } else {
      console.log('no pasó guard');
      this.route.navigate(['/auth/login']);
      return false;
    }
  }
}

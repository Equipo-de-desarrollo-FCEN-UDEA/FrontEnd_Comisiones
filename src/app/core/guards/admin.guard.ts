import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RolService } from '@services/auth/roles.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  rol='';
  constructor( 
    private roler: RolService,
    
    ) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.roler.getRoles().subscribe(data=>{
        
      this.rol=data.nombre;
      console.log(this.rol)
    
    });



      if (this.rol == 'admin') {
        console.log('admin')
        return true;
      }
    
      console.log(this.rol)
      return true;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Rol } from '@interfaces/roles';
import { Usuario, UsuarioInside } from '@interfaces/usuario';
import { AuthService } from '@services/auth/auth.service';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { prefix } from '@shared/data/ruta-api';
import { filter} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed=true;
  public currentURL: any;
  public usuario!: Usuario; 
  public rol!: Rol
  public usuarioInside!: UsuarioInside;
  public admin: any = true;
  public prefix = prefix

  constructor(
    private authService : AuthService,
    private usuarioService : UsuarioService,
    private router : Router,
    private activateRoute: ActivatedRoute,
  ) { 
    this.router.events.pipe(
      filter(res => res instanceof NavigationEnd)
      )
    .subscribe(
      () => {
        this.currentURL = this.router.url;
      }
      );  
      // console.log('ruta '+this.currentURL);
      
      this.usuarioService.getUsuario().subscribe((resUsuario) => {
        this.usuario = resUsuario;
      });
  }


  ngOnInit(): void {
    
}

  

  logout() {
    this.authService.logout();
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Comision } from '@interfaces/comisiones';
import { Usuario, UsuarioInDB, UsuarioResponse } from '@interfaces/usuario';
import { prefix } from '@shared/data/ruta-api';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string = prefix +'usuarios';
  // private urlEndPointArch:string = prefix +'archivarusuarios';


  constructor(
    private cookie: CookieService,
    private route: Router,
    private http: HttpClient
  ) { }

  scopeGetusuarios( ): Observable<any> {
    let params = new HttpParams()
    
    // if (archivado != 2 ){
    //   params = params.append('archivado', archivado);
    // }
    
    params = params.append('offset', 0);
    params = params.append('limit', 100);

    return this.http.get<Usuario[]>(`${this.urlEndPoint}`, {
      params:params
    })
  }




  prefix = prefix + 'usuarios';

  getUsuario() : Observable<UsuarioResponse> {
    const basicUsuario = JSON.parse(this.cookie.get('usuario'));
    return this.http.get<UsuarioResponse>(`${this.prefix}/${basicUsuario.id}`);
  }

  getActualUsuario() {
    if (this.cookie.check('usuario')) {
      const basicUsuario = JSON.parse(this.cookie.get('usuario'));
      return basicUsuario;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }

  getUsuariobyId(id:number | string){
    return this.http.get<UsuarioResponse>(`${this.prefix}/${id}`);
  }

  getAllUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.prefix}`);
  }


  postUsuario(usuario:any){
    return this.http.post<UsuarioResponse>(`${this.prefix}`, usuario);
  }

  updateUsuario(usuario: any) {
    return this.http.patch(`${this.prefix}/${usuario.id}`, usuario);
  }

}

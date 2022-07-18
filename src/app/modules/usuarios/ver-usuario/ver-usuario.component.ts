import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioResponse } from '@interfaces/usuario';
import { UsuarioService } from '@services/usuario.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.scss']
})


export class VerUsuarioComponent implements OnInit {
  public usuario : UsuarioResponse | undefined;
  public id : Number | string = 0;
  constructor(
    private usuarioSvc: UsuarioService,
    private router: ActivatedRoute
  ) {
    this.router.params.pipe(take(1)).subscribe(params => this.id = params['id']);
  
   }

  ngOnInit(): void {
    if (this.id == 'me'){
      this.usuarioSvc.getUsuario().subscribe(
        (data: UsuarioResponse) => {
          this.usuario = data;
        }
      );
    } else {
    this.usuarioSvc.getUsuariobyId(this.id as Number).subscribe((res:UsuarioResponse) => {
      this.usuario = res;
    }
    );
  }
  console.log(this.usuario);
}

}

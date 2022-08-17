import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario, UsuarioResponse } from '@interfaces/usuario';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.scss']
})


export class VerUsuarioComponent implements OnInit {
  public usuario!: Usuario;
  public usuarioResponse!: UsuarioResponse;
  public id : Number | string = 0;
  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private activateRoute: ActivatedRoute,

  ) {
    this.router.params.pipe(take(1)).subscribe(params => this.id = params['id']);
  
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.usuarioService.getUsuario().subscribe((resUsuario) => {
        this.usuario = resUsuario;
      }); 
    });
}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, UsuarioResponse } from '@interfaces/usuario';
import { UsuarioService } from '@services/usuarios/usuario.service';
import { take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.scss']
})


export class VerUsuarioComponent implements OnInit {
  public rol : string = localStorage.getItem('rol') || '';
  public usuario: Usuario | undefined;
  public usuarioResponse!: UsuarioResponse;
  public id : number | string = 0;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,

  ) {
    this.activateRoute.params.pipe(take(1)).subscribe(params => this.id = params['id']);
    this.activateRoute.params.subscribe({
      next: (params) => {
      this.usuarioService.getUsuariobyId(this.id).subscribe(
        {
          next: (resUsuario) => {
          this.usuario = resUsuario;
          },
          error: (err) => {
            if (err.status == 401){
            Swal.fire({
              title: 'No autorizado',
              text: 'No estás autorizado para ver este sitio',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            }).then(() => this.router.navigate(['/']));
          }
          }
        }
        
        );
      }
    });
   }

  ngOnInit(): void {
    
  }
}

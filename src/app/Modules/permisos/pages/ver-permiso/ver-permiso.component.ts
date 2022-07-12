import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisosInside } from '@interfaces/permisos';
import { PermisoService } from '@services/permiso.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-permiso',
  templateUrl: './ver-permiso.component.html',
  styleUrls: ['./ver-permiso.component.scss']
})
export class VerPermisoComponent implements OnInit {

  loading:boolean = false;
  error:string = '';
  permiso: PermisosInside | undefined;
  permiso$: Observable<PermisosInside> | undefined;
  permisos: any = [];

  constructor(
    private permisoService: PermisoService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { } 

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.permisoService.getPermiso(id).subscribe((resPermisos) => {
          this.permiso = resPermisos;
          console.log(this.permiso);
        });
      }
    });
  }

  delete(id: any): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este permiso?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.permisoService.delete(id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home/permisos']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡El permiso ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
              this.loading = false;
            }
          },
        });
      }
    });
  }
}


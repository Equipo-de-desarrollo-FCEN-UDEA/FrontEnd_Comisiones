import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comision } from '@interfaces/comisiones';
import { ComisionesService } from '@services/comisiones.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-comision',
  templateUrl: './ver-comision.component.html',
  styleUrls: ['./ver-comision.component.scss']
})
export class VerComisionComponent implements OnInit {

  loading:boolean = false;
  error:string = '';
  comision: Comision | undefined;
  comision$: Observable<Comision> | undefined
  comisiones:any = []

  constructor(
    private comisionesService: ComisionesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.comisionesService.getComision(id).subscribe((resComision) => {
          this.comision = resComision;
          console.log(this.comision);
        });
      }
    });
  }
  delete(id: any): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta comisión?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comisionesService.delete(id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home/comisiones']);
            Swal.fire({
              title: 'Eliminada!',
              text: '¡la comisión ha sido eliminada!',
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

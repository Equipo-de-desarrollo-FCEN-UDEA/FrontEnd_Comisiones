import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { PlanTrabajo } from '@interfaces/plantrabajo';
=======
import { PlanTrabajo } from '@interfaces/dedicaciones/plantrabajo';
>>>>>>> main
import { prefix } from '@shared/data/ruta-api';
import {saveAs} from 'file-saver';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoService {

  private prefix = prefix+'plantrabajo';

  constructor(
    private http: HttpClient
  ) { }

  postPlanTrabajo(planTrabajo: any) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Response-Type': 'blob'
      }
    )
    return this.http.post(this.prefix, planTrabajo,{
      observe: 'response',
      responseType: 'blob',
      headers: headers
    }).pipe(
      tap(
        (content:any) => {
          console.log(content);
          const blob = new Blob([content.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'plan-trabajo.xlsx');
        }

      ),
      map(
        () => true
      )
    );
  }
}

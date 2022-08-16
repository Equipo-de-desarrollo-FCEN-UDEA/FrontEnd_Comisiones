import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearComisionComponentsService {

  id$ : Observable<number | string> = new Observable();
  constructor() { }

  setId(id: number | string) {
    this.id$ = new Observable(observer => {
      observer.next(id);
    });
  }
}

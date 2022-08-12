import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearComisionComponentsService {

  id$ : Observable<Number | string> = new Observable();
  constructor() { }

  setId(id: Number | string) {
    this.id$ = new Observable(observer => {
      observer.next(id);
    });
  }
}

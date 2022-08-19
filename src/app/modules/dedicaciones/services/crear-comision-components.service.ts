import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearComisionComponentsService {

  id$ : Observable<number | string> = new Observable();
  cartaSuccess$ : Subject<boolean> = new Subject();
  formatoSuccess$ : Subject<boolean> = new Subject();
  planSuccess$ : Subject<boolean> = new Subject();
  constructor() {
    this.cartaSuccess$.next(false);
    this.formatoSuccess$.next(false);
    this.planSuccess$.next(false);
   }

  setId(id: number | string) {
    this.id$ = new Observable(observer => {
      observer.next(id);
    });
  }

  setCartaSuccess(success: boolean) {
    this.cartaSuccess$.next(success);
  }
  setFormatoSuccess(success: boolean) {
    this.formatoSuccess$.next(success);
  }
  setPlanSuccess(success: boolean) {
    this.planSuccess$.next(success);
  }
}

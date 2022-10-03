import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { CartaInside } from '@interfaces/dedicaciones/carta';
import { FormatosviceInside } from '@interfaces/dedicaciones/formatovice';
import { PlanTrabajoInside } from '@interfaces/dedicaciones/plantrabajo';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearComisionComponentsService {

  id$ : Observable<number | string> = new Observable();
  cartaSuccess$ : Subject<boolean> = new Subject();
  formatoSuccess$ : Subject<boolean> = new Subject();
  planSuccess$ : Subject<boolean> = new Subject();
  editCarta$: Subject<CartaInside | null> = new Subject();
  editFormato$: Subject<FormatosviceInside | null> = new Subject();
  editPlan$: Subject<PlanTrabajoInside | null> = new Subject();
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

  editCarta(body: CartaInside | null){
    this.editCarta$.next(body)
  }

  editFormato(formato: FormatosviceInside | null) {
    this.editFormato$.next(formato)
  }

  editPlan(plan: PlanTrabajoInside | null) {
    this.editPlan$.next(plan)
  }
  

}

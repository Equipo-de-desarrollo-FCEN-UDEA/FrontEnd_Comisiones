import { Pipe, PipeTransform } from '@angular/core';
import { Comision } from '@interfaces/comisiones';
import { ultimoElement } from '@shared/clases/ultimo-estado';

@Pipe({
  name: 'filtroComision'
})
export class FiltroComisionPipe implements PipeTransform {

  transform(comisiones:Comision[], ...args: unknown[]): Comision[] {
    return [];
  }

}

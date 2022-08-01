import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPermiso'
})
export class FiltroPermisoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

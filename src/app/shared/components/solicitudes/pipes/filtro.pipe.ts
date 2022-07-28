import { Pipe, PipeTransform } from '@angular/core';
import { Comision } from '@interfaces/comisiones';
import { ultimoElement } from '@shared/clases/ultimo-estado';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(comisiones: Comision[], page: number = 0, search:string = '' ): Comision[] {

    if(search.length ===0)
    return comisiones.slice(page, page + 1);

    const filteredComisiones = comisiones
    .filter (comision => ultimoElement(
      comision.intermediate_comisiones).intermediate_estados.nombre.toLowerCase().includes(search) ||
      ultimoElement(
        comision.intermediate_comisiones).created_at.includes(search) ||
      comision.usuarios.nombre.toLowerCase().includes(search)||
      comision.usuarios.apellido.toLowerCase().includes(search)||
      comision.usuarios.departamentos.nombre.toLowerCase().includes(search)
      );
    return filteredComisiones;
  }

}

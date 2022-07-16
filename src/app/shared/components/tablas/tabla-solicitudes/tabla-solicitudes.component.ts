import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import { Comision } from "../../../../core/interfaces/comisiones";

import {Country} from './country';
// import {CountryService} from './country.service';
import {NgbdSortableHeader, SortEvent} from '@shared/directivas/sortable.directive';
import { BuscarComisionesService } from '@services/buscar-comisiones.service';


@Component(
    {selector: 'app-tabla-solicitudes', templateUrl: './tabla-solicitudes.component.html', providers: [BuscarComisionesService, DecimalPipe]})
export class TablaSolicitudesComponent {
  comisiones$: Observable<Comision[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: BuscarComisionesService) {
    this.comisiones$ = service.comisiones$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}





// import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
// import { Router } from '@angular/router';
// import { BuscarComisionesService } from '@services/buscar-comisiones.service';
// import { NgbdSortableHeader, SortEvent } from '@shared/directivas/sortable.directive';
// // import { ConsoleReporter } from 'jasmine';
// // import { ConsoleReporter } from 'jasmine';
// import { Observable } from 'rxjs';
// import { Comision } from 'src/app/core/interfaces/comisiones';
// // import { ComisionEstados } from 'src/app/core/interfaces/comisionesxestado';
// import { ComisionesService } from 'src/app/core/services/comisiones.service';
// // import { ComisionxestadoService } from 'src/app/core/services/comisionesxestado.service';

// @Component({
//   selector: 'app-tabla-solicitudes',
//   templateUrl: './tabla-solicitudes.component.html',
//   styleUrls: ['./tabla-solicitudes.component.scss']
// })
// export class TablaSolicitudesComponent implements OnInit {
//   comisiones$: Observable<Comision[]> | undefined;
//   total$: Observable<number> | undefined;
//   Solicitudes: any = [];
//   listSolicitudes = false;
//   error = '';

//   @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

  

//   constructor(

//     public comisionesService: ComisionesService,
//     public buscarComisionesServices: BuscarComisionesService,
//     public router: Router
//     // private comisionxEstdoService: ComisionxestadoService,
//   ) { }

//   ngOnInit(): void {

//     this.comisiones$ = this.buscarComisionesServices.comisiones$;

//     this.buscarComisionesServices.comisiones$.subscribe({
//       next: (data) => {
//         if (this.comisiones$) {
//           this.listSolicitudes = true;
//         }
//       },
//       error: (err) => {
//         if (err.status === 404 || err.status === 401) {
//           this.error = err.error.msg;
//         }
//       },
//     });

//     this.total$ = this.buscarComisionesServices.total$;
    
//   }

//   // onSort({ column, direction }: SortEvent) {
//   //   // resetting other headers
//   //   this.headers.forEach((header) => {
//   //     if (header.sortable !== column) {
//   //       header.direction = '';
//   //     }
//   //   });

//   //   this.buscarComisionesServices.sortColumn = column;
//   //   this.buscarComisionesServices.sortDirection = direction;
//   // }
  
  


  
  
// }


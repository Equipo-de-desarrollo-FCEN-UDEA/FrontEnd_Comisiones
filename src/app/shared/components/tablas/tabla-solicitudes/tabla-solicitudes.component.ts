import { Component, OnInit } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
// import { ConsoleReporter } from 'jasmine';
import { Observable } from 'rxjs';
import { Comision } from 'src/app/core/interfaces/comisiones';
// import { ComisionEstados } from 'src/app/core/interfaces/comisionesxestado';
import { ComisionesService } from 'src/app/core/services/comisiones.service';
// import { ComisionxestadoService } from 'src/app/core/services/comisionesxestado.service';

@Component({
  selector: 'app-tabla-solicitudes',
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss']
})
export class TablaSolicitudesComponent implements OnInit {


  comisiones!: Comision[];
  // permisos!: Permiso[];
  // comisionxestado!: ComisionEstados[];

  constructor(

    private comisionesService: ComisionesService,
    // private comisionxEstdoService: ComisionxestadoService,
  ) { }

  ngOnInit(): void {

    this.comisionesService.getComisiones().subscribe(
      comisiones => this.comisiones = comisiones
    );

    // this.comisionesService.getComisiones()
    //   .subscribe(resp =>{
    //     console.log(resp.);
      
    //   })

    

    // this.comisionesService.getComisiones()
    //   .subscribe((resp: ComisionesinDB)=> {
    //     console.log( resp);
        
    //   }
        
        
      
    // );

    // this.comisionesService.getComisiones().subscribe(
    //   comisiones => this.comisiones! = comisiones
    // );

    // // this.permisos = this.permisosService.getPermisos();

    // this.comisionxEstdoService.getComisionxEstado().subscribe(
    //   comisionesxEstado => this.comisionxestado = comisionesxEstado
    // )
    // console.log(this.comisiones);
  }

}

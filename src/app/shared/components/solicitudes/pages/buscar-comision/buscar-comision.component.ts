import { Component, OnInit } from '@angular/core';
import { Comision } from '@interfaces/comisiones';
import { SolicitudesService } from '@services/solicitudes.service';

@Component({
  selector: 'app-buscar-comision',
  templateUrl: './buscar-comision.component.html',
  styleUrls: ['./buscar-comision.component.scss']
})
export class BuscarComisionComponent implements OnInit{

  comisiones: Comision[] | any = [];


  constructor(private solicitudService: SolicitudesService) { }

  ngOnInit(): void {

    this.solicitudService.buscarComisiones()
    .subscribe(res => {
      this.comisiones = res;
    
  });
}
    // console.log(this.termino)

   
  
  
}


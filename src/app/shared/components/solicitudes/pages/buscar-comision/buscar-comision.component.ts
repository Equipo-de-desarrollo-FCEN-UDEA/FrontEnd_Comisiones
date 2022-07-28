import { Component, OnInit } from '@angular/core';
import { Comision } from '@interfaces/comisiones';
import { SolicitudesService } from '@services/solicitudes.service';
import { Observable } from 'rxjs';
import { ultimoElement } from "@shared/clases/ultimo-estado";

@Component({
  selector: 'app-buscar-comision',
  templateUrl: './buscar-comision.component.html',
  styleUrls: ['./buscar-comision.component.scss']
})
export class BuscarComisionComponent implements OnInit{

  public comisiones: Comision[] = [];
  public page: number = 0;
  public search: string = ''
  ultimoElemento = ultimoElement

  constructor(private solicitudService: SolicitudesService,
    ) { this.ultimoElemento = ultimoElement
    
  }

  ngOnInit(): void {

    this.solicitudService.buscarComisiones().subscribe(
      comisiones => this.comisiones = comisiones
    );

    // this.permisos = this.permisosService.getPermisos();

    
  }

  nextPage(){

    this.page += 5;

  }

  prevPage(){
    if(this.page > 0)
    this.page -= 5;

  }

  onSearchComision(search: string){
    this.search=  search;
    console.log(search)
  }

 
}
    // console.log(this.termino)

   
  
  



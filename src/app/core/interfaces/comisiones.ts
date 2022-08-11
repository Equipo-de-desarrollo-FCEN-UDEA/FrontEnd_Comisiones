import { ComisionesXEstadoInside } from "./comisionesxestado";
import { CumplidoInside } from "./cumplidos";
import { DocumentosInside } from "./documentos";
import { TipoComisionInside } from "./tipos_comision";
import { UsuarioInside } from "./usuario";
import {  } from "./permisos";

export interface ComResInside {
    id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    justificacion: string;
    tipos_comision_id: number;
}

export interface ComisionDTO extends Omit<ComResInside, 'id'>{
    archivos : File[];
    fecha_resolucion?: Date;
    resolucion?: string;
    justificacion: string;
    idioma?: string;
    lugar?: string;
    tipos_comision_id: number;
    usuarios_id: number;
}

export interface ComisionesinDB extends Omit<ComisionDTO,'archivo'>, ComResInside {

}

export interface Comision extends ComisionesinDB{
    tipos_comision: TipoComisionInside
    documentos: DocumentosInside[];
    cumplidos: CumplidoInside[];
    usuarios: UsuarioInside;
    intermediate_comisiones: ComisionesXEstadoInside[];
    tipos_comision_id: number;
}

export interface ComisionesXEstadoInDB{
    comisiones_id: number;
    estados_id: number;
    created_at: Date;

}





    




// Interface de quicktype


// export interface Comisiones {
//     id:                      number;
//     fecha_inicio:            Date;
//     fecha_fin:               Date;
//     fecha_resolucion:        Date;
//     resolucion:              string;
//     justificacion:           string;
//     idioma:                  string;
//     lugar:                   string;
//     updatedAt:               Date;
//     createdAt:               Date;
//     tipos_comision_id:       number;
//     usuarios:{
//       nombre: string;
//       apellido: string;
  
  
//       departamentos: {
//         nombre: string;
//         facultades:{
//           nombre: string
//         }
//       }
//     }
//     tipos_comision:          TiposComision;
//     documentos:              any[];
//     cumplidos:               any[];
//     nombreEstadoActual: string;
//     estadoActual: {
//       createdAt: Date;
//       intermediate_estados: { nombre: string };
//     }
  
//   intermediate_comisiones: [
//     {
//       createdAt: Date;
//       fecha_actualizacion: Date;
//       intermediate_estados: {
//         nombre: string;
//       };
//     }
//   ]
  
  
//   };
  
  
//   export interface intermediate_comisiones {
//     createdAt: Date;
//     fecha_actualizacion: Date;
//     intermediate_estados: {
//       nombre: string;}
  
//     }
  
  // interface IntermediateComisiones {
  //   nombre: string
  // }
  
  
  // intermediate_estados:    IntermediateEstados;
  
  
//   export interface TiposComision {
//     nombre: string;
//   }
  
  
  
  
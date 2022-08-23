import { EstadoInside } from "./estados";

export interface ComisionesXEstadoBase {
    id: number;
    observacion: string;
    
}

export interface ComisionesXEstadoInside extends ComisionesXEstadoBase {

  id: number,
  intermediate_estados: EstadoInside;
  createdAt: Date;

}

export interface ComisionesXEstadoInDB extends ComisionesXEstadoInside {
    comisiones_id: number;
    estados_id: number;
    created_at: Date;
}
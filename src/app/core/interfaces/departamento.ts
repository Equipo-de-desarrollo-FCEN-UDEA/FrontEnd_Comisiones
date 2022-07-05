import { FacResInside } from "./facultades";

export interface DepartamentoBase {
    nombre : string;
    descripcion : string;
    correo_coord : string;
}

export interface DepartamentoInDB extends DepartamentoBase {
    id: number;
    facultades_id: number;
}

export interface DepResInside extends Omit<DepartamentoBase,  | 'correo_coord' | 'descripcion'> {
    facultades: FacResInside
}
import { EstadoInside } from "./estados";

export interface PermisosxestadoBase {
    id: number;
    observacion: string;
}

export interface PermisosxestadoInside extends PermisosxestadoBase {
    createdAt: Date; 
    intermediate_estados: EstadoInside[];
}

export interface PermisosxestadoInDB extends PermisosxestadoInside {
    permisos_id: number;
    estados_id: number;
    created_at: Date;
}

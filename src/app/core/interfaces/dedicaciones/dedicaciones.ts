import { ComisionesXEstadoInside } from "@interfaces/comisionesxestado";
import { UsuarioInside } from "@interfaces/usuario";
import { CartaInside } from "./carta";
import { FormatosviceInside } from "./formatovice";
import { PlanTrabajoInside } from "./plantrabajo";

export interface DedicacionBase {
    descripcion: string;
}

export interface Dedicacion extends DedicacionBase {
    id: number;
    archivado: boolean;
    usuarios_id: number;
}

export interface DedicacionDTO extends Dedicacion{
   usuarios: UsuarioInside;
   intermediate_dedicaciones: ComisionesXEstadoInside[];
   cartas: CartaInside | null;
   formatosvice: FormatosviceInside | null;
   plantrabajo: PlanTrabajoInside | null;
}
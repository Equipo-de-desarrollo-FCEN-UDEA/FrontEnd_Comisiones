import { UsuarioInside } from "@interfaces/usuario";

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
   intermediate_dedicaciones: any[];
   cartas: any;
   formatosvice: any;
   plantrabajo: any;
}
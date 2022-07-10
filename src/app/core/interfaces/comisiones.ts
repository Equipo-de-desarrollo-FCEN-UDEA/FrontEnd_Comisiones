import { ComisionesXEstadoInside } from "./comisionesxestado";
import { CumplidoInside } from "./cumplidos";
import { DocumentosInside } from "./documentos";
import { TipoComisionInside } from "./tipos_comision";
import { UsuarioInside } from "./usuario";

export interface ComResInside {
    id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    justificacion: string;
} 

export interface ComisionDTO extends Omit<ComResInside, 'id'>{
    archivo : File[];
    fecha_resolucion?: Date;
    resolucion?: string;
    justificacion: string;
    idioma?: string;
    lugar?: string;
    tipo_comision_id: number;
    usuarios_id: number;
}

export interface ComisionesinDB extends Omit<ComisionDTO,'archivo'>, ComResInside {

}

export interface Comision extends ComisionesinDB{
    tipos_comision: TipoComisionInside
    documentos: DocumentosInside[];
    cumplidos: CumplidoInside[];
    usuarios: UsuarioInside[];
    intermediate_comisiones: ComisionesXEstadoInside[];
}
import { plandesarrollo } from "./plandesarrollo";

export interface FormatoVice {
    titulo: string;
    tiempo_solicitado: number;
    campo_modalidad: string;
    descripcion_comprobante: string;
    metas: any[];
    productos: any[];
    dedicaciones_id?: number | string;
    plan_desarrollo: plandesarrollo;
}


export interface DexclusivaInDB extends FormatoVice {
    id: number;

}

export interface FormatosviceInside {
    id: number;
    fecha_diligenciamiento: Date;
    titulo: string;
    documentos:any;
}

export interface Dexclusiva {

}

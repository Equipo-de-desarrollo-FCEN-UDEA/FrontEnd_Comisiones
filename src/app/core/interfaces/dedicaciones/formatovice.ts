import { plandesarrollo } from "./plandesarrollo";

export interface FormatoVice {
    titulo: string;
    tiempo_solicitado: number;
    campo_modalidad: string;
    descripcion_comprobante: string;
    metas_productos: any[];
    dedicaciones_id?: number | string;
    objetivos_has_indicador: number[];
    acciones: number[]
}


export interface DexclusivaInDB extends FormatoVice {
    id: number;

}

export interface FormatosviceInside {
    id: number;
    fecha_diligenciamiento: Date;
    titulo: string;
    documentos: any;
}

export interface Dexclusiva {

}


export interface FormatoVicedocencia {
    id: number;
    fecha_diligenciamiento: Date;
    tiempo_solicitado: number;
    campo_modalidad: string;
    descripcion_comprobante: string;
    dedicaciones_id: number;
    dedicaciones: Dedicaciones;
    intermediate_formatos: IntermediateFormatos[];
    intermediate_formatos_accion: IntermediateFormatosAccion[];
    intermediate_metas_productos: IntermediateMetasProductos[];
    documentos: Documentos;
}

export interface Dedicaciones {
    id: number;
    titulo: string;
    archivado: boolean;
    resolucion: string;
    fecha_inicio?: Date;
    fecha_informe?: Date;
    fecha_fin?: Date;
    createdAt: Date;
    usuarios_id: number;
    usuarios: Usuarios;
    intermediate_dedicaciones: IntermediateDedicaciones[];
}

export interface IntermediateDedicaciones {
    id: number;
    createdAt: Date;
    observacion: string;
    intermediate_estados: Documentos;
}

export interface Documentos {
    id: number;
    nombre: string;
}

export interface Usuarios {
    id: number;
    nombre: string;
    apellido: string;
    departamentos: Departamentos;
}

export interface Departamentos {
    id: number;
    nombre: string;
    descripcion: string;
    facultades?: Departamentos;
}

export interface IntermediateFormatos {
    id: number;
    formatosvice_id: number;
    objetivos_has_indicador_id: number;
    intermediate_objetivos_indicadores: IntermediateObjetivosIndicadores;
}

export interface IntermediateObjetivosIndicadores {
    id: number;
    indicadores_id: number;
    objetivos_id: number;
    indicadores: Indicadores;
    objetivos: Objetivos;
}

export interface Indicadores {
    id: number;
    descripcion: string;
}

export interface Objetivos {
    id: number;
    descripcion: string;
    temas_id: number;
    temas: Temas;
}

export interface Temas {
    id: number;
    titulo: string;
    subtitulo: string;
}

export interface IntermediateFormatosAccion {
    id: number;
    formatosvice_id: number;
    acciones_id: number;
    intermediate_acciones: IntermediateAcciones;
}

export interface IntermediateAcciones {
    id: number;
    descripcion: string;
    objetivos_id: number;
    objetivos: Objetivos;
}

export interface IntermediateMetasProductos {
    id: number;
    descripcion: string;
    tipo: string;
    formatosvice_id: number;
}
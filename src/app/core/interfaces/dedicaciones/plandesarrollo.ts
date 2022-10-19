export interface Tema {
    id: number;
    titulo: string;
    subtitulo: string;
    objetivos: Objetivo[];
}

export interface Objetivo {
    id: number;
    descripcion: string;
    acciones: Acciones[];
    intermediate_objetivos_indicadores: IntermediateObjetivosIndicadores[];
}

export interface Acciones {
    id: number;
    descripcion: string;
}

export interface IntermediateObjetivosIndicadores {
    id: number;
    indicadores_id: number;
    indicadores: Acciones;
}

export interface plandesarrollo {
    temas: Tema[]
}

export interface ObjetivoTemaId extends Objetivo {
    idTema : number
  }
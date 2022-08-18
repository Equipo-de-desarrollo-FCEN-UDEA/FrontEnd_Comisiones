export interface FormatoVice {
    extension_oficina:       string| null| undefined;
    celular:                 number| null;
    titulo:                  string;
    tiempo_solicitado:       number;
    campo_modalidad:         string;
    descripcion_comprobante: string;
    tema_estrategico:        string[];
    metas:                   string[];
    acciones_estrategicas:   string[];
    objetivo_estrategico_institucional: string[];
    objetivo_estrategico_desarrollo: string[];
    indicador:               string[];
    productos:               string[];
    dedicaciones_id?:         number | string;
}


export interface DexclusivaInDB extends FormatoVice {
    id:                      number;
    
}

export interface formatosviceInside {
    id:                     number;
    fecha_diligenciamiento: Date;
    titulo:                 string;
    documentos:             any[];
}

export interface Dexclusiva{

}

export interface DexclusivaInDB {
    id:                      number;
    fecha_diligenciamiento:  Date;
    unidad_academica:        string;
    nombre:                  string;
    apellido:                string;
    identificacion:          number;
    extension_oficina:       string;
    celular:                 string;
    correo:                  string;
    titulo:                  string;
    tiempo_solicitado:       number;
    campo_modalidad:         string;
    descripcion_comprobante: string;
    tema_estrategico:        string[];
    objetivo_estrategico:    string[];
    metas:                   string[];
    acciones_estrategicas:   string[];
    objetivo_estrategico_institucional: string[];
    indicador:               string[];
    productos:               string[];
    usuarios_id:             number;
}

export interface Dexclusiva{
    
}

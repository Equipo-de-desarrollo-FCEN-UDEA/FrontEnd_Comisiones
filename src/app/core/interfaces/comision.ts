// import { ComisionesXEstadoInside } from "./comisionesxestado";
// import { CumplidoInside } from "./cumplidos";
// import { DocumentosInside } from "./documentos";
// import { TipoComisionInside } from "./tipos_comision";
// import { UsuarioInside } from "./usuario";

// export interface ComResInside {
//     id: number;
//     fecha_inicio: Date;
//     fecha_fin: Date;
//     justificacion: string;
// } 

// export interface ComisionDTO extends Omit<ComResInside, 'id'>{
//     archivo : File[];
//     fecha_resolucion?: Date;
//     resolucion?: string;
//     justificacion: string;
//     idioma?: string;
//     lugar?: string;
//     tipo_comision_id: number;
//     usuarios_id: number;
// }

// export interface ComisionesinDB extends Omit<ComisionDTO,'archivo'>, ComResInside {

// }

// export interface Comision extends ComisionesinDB{
//     tipos_comision: TipoComisionInside
//     documentos: DocumentosInside[];
//     cumplidos: CumplidoInside[];
//     usuarios: UsuarioInside[];
//     intermediate_comisiones: ComisionesXEstadoInside[];
// }

export interface Comision {
    id:                      number;
    fecha_inicio:            Date;
    fecha_fin:               Date;
    fecha_resolucion:        Date;
    resolucion:              string;
    justificacion:           string;
    idioma:                  string;
    lugar:                   string;
    tipos_comision_id:       number;
    usuarios_id:             number;
    tipos_comision:          TiposComision;
    documentos:              any[];
    cumplidos:               any[];
    usuarios:                Usuarios;
    intermediate_comisiones: IntermediateComisione[];
}

export interface IntermediateComisione {
    id:                   number;
    observacion:          string;
    intermediate_estados: TiposComision;
}

export interface TiposComision {
    id:     number;
    nombre: string;
}

export interface Usuarios {
    id:            number;
    nombre:        string;
    apellido:      string;
    departamentos: Departamentos | null;
}

export interface Departamentos {
    id:          number;
    nombre:      string;
    descripcion: string;
    facultades?: Departamentos;
}

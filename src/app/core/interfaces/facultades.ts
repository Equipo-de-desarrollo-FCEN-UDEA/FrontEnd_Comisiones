export interface FacResInside {
    nombre: string;
}

export interface FacultadBase extends FacResInside {
    descripcion : string;
    correo_decano : string;
}

export interface FacultadesInDB extends FacultadBase {
    id: number;
    centro_de_costo?: number;
}

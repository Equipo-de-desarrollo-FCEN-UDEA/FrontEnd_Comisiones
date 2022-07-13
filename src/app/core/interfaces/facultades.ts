export interface FacResInside {
    id: number;
    descripcion: string;
    nombre: string;
}

export interface FacultadBase extends FacResInside {
    correo_decano : string;
}

export interface FacultadesInDB extends FacultadBase {
    centro_de_costo?: number;
}

export interface TiposPermisoInside {
    id: number;
    nombre: string;
}

export interface TiposPermiso extends TiposPermisoInside {
    descripcion: string;
    dias: number;
}

export interface TiposPermisoInDB extends TiposPermiso {
}
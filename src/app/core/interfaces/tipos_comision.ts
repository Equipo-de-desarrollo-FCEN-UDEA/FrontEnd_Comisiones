export interface TipoComisionInside {
    id: number;
    nombre: string;
}

export interface TipoComision extends TipoComisionInside {
    descripcion: string;
}

export interface TipoComisionInDB extends TipoComision{
    
}
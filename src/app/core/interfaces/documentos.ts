export interface DocumentosInside {
    id: number;
    nombre: string;
}

export interface DocumentosInDB extends DocumentosInside{
    comisiones_id?: number;
    dedicaciones_profesor_id?: number;
    permisos_id?: number;
}

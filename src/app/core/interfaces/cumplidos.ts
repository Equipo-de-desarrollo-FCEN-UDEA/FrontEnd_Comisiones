export interface CumplidoInside {
    id: number;
    nombre: string;
}

export interface Cumplido extends CumplidoInside {
    correos: string;
    observaciones?: string;
    created_at: Date;
    comisiones_id?: number;
}


export interface CumplidoDTO extends Omit<CumplidoInside, 'id'>{
    archivos : File[];
    correos: string;
    observaciones?: string;
    created_at: Date;
    comisiones_id?: number;
}

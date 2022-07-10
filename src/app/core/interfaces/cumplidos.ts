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

export interface ComisionesinDB {
    id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    fecha_resolucion?: Date;
    resolucion?: string;
    justificacion: string;
    idioma?: string;
    lugar?: string;
    tipos_comision_id: number;
    usuarios_id: number;
}

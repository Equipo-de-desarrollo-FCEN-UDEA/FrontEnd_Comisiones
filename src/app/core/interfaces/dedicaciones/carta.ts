export interface Carta {
    body?: string;
    dedicaciones_id: number | string;
    archivo?: File;
}

export interface CartaInside extends Carta {
    id: number;
    adjunto_nombre: any;
    documentos: any[];
}
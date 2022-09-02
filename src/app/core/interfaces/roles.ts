export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RolResponse {
    id: number;
    nombre: string;
}
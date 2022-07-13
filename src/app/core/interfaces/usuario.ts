import { ComisionesinDB, ComResInside } from "./comisiones";
import { DepResInside } from "./departamentos";
import { PermisosInside } from "./permisos";

export interface UsuarioEmail{
    email: string;
}

export interface UsuarioAuth extends UsuarioEmail {
    contrasena: string;
}

export interface UsuarioBase {
    id: number;
    nombre: string;
    apellido: string;
}

export interface UsuarioInside extends UsuarioBase {
    departamentos: DepResInside;
}

export interface Usuario extends UsuarioBase{
    tipo_identificacion?: string;
    identificacion?: number;
    email: string;
    estado?: string;
    dia_disponible?: number;
    created_at: Date;
    updated_at: Date;
    departamentos_id: number;
    roles_id: number;
}

export interface UsuarioInDB extends Usuario {
    contrasena: string;
}

export interface UsuarioResponse extends Usuario {
    departamentos: DepResInside;
    comisiones: ComResInside[];
    permisos: PermisosInside[];
}

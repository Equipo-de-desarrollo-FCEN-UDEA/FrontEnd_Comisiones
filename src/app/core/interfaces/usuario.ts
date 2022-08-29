import { ComisionesinDB, ComResInside } from "./comisiones";
import { DepResInside } from "./departamentos";
import { PermisosInside } from "./permisos";
import { Rol, RolResponse } from "./roles";

export interface UsuarioCorreo{
    correo: string;
}

export interface UsuarioAuth extends UsuarioCorreo {
    contrasena: string;
}

export interface UsuarioBase {
    id: number;
    nombre: string;
    apellido: string;
}

export interface UsuarioInside extends UsuarioBase {
    departamentos: DepResInside;
    roles: RolResponse;
}

export interface Usuario extends UsuarioBase{
    tipo_identificacion?: string;
    identificacion?: number;
    correo: string;
    estado?: string;
    createdAt: Date;
    updated_at: Date;
    departamentos: DepResInside;
    rol_id: number,
    roles: RolResponse;
}

export interface UsuarioInDB extends Usuario {
    contrasena: string;
}

export interface UsuarioResponse extends Usuario {
    departamentos: DepResInside;
    comisiones: ComResInside[];
    // roles: RolResponse[];
    permisos: PermisosInside[];
}

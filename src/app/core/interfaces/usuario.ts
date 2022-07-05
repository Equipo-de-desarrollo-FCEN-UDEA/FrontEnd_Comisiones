import { ComisionesinDB } from "./comisiones";
import { DepResInside } from "./departamento";

export interface UsuarioEmail{
    email: string;
}

export interface UsuarioAuth extends UsuarioEmail {
    contrasena: string;
}

export interface UsuarioBase extends UsuarioEmail {
    nombre: string;
    apellido: string;
    identificacion: number;
    estado?: string;
}

export interface UsResInside extends UsuarioBase{
    departamentos: DepResInside;
}

export interface UsuarioInDB extends UsuarioAuth, UsuarioBase {
    id: number;
    tipo_identificacion: string;
    dia_disponible?: number;
    created_At: Date;
    updated_At: Date;
    departamentos_id: number;
    roles_id: number;
}

export interface Usuario extends UsResInside {
    departamentos: DepResInside
    comisiones: ComisionesinDB[];
  }

export interface UsuarioSignup extends Omit<UsuarioInDB,  | "dia_disponible" | "estado" | "updated_At" | "created_At" > {
//  Por discutir con el backend
}

export interface UsuarioAuthResponse {
    usuario: Usuario;
    token: string;
    expiresIn: string;
}

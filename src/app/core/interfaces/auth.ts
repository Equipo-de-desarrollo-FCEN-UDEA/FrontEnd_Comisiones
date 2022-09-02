import { Usuario, UsuarioResponse } from "./usuario";

export interface Auth {
    usuario: UsuarioResponse;
    token: string;
    expiresIn: string;
}

import { ComisionesinDB } from "./comisiones";
import { UsuarioBase, UsuarioInDB } from "./usuario";

export interface CumplidoBase {
    name:          string;
    emails:        string;
    observations:  string;
    createdAt:     Date;
}

export interface CumpliResInside extends CumplidoBase {
    comisiones: ComisionesinDB[];
    usuario: UsuarioBase[];
    
}

// export interface Comisiones {
//     id:       number;
//     usuarios: Usuarios;
// }

export interface Usuarios {
    nombre:         string;
    apellido:       string;
    identificacion: number;
    email:          string;
    departamentos:  Departamentos;
}

export interface Departamentos {
    nombre:     string;
    facultades: Facultades;
}

export interface Facultades {
    nombre: string;
}

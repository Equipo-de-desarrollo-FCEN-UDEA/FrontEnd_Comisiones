import { Comision } from "./comisiones";
import { DocumentosInside } from "./documentos";
import { PermisosxestadoInside } from "./permisosxestado";
import { TiposPermisoInside } from "./tipos_permiso";
import { UsuarioInside } from "./usuario";

export interface PermisosInside {
    id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    justificacion: string;
}

export interface PermisosDTO extends Omit<PermisosInside, 'id'> {
    archivo: File[];
    tipo_permiso_id: number;
    usuarios_id: number;
}

export interface PermisosInDB extends Omit<PermisosDTO, 'archivo'>, PermisosInside {

}

export interface Permiso extends PermisosInDB {
    tipos_permiso: TiposPermisoInside;
    documentos: DocumentosInside[];
    usuarios: UsuarioInside;
    intermediate_permisos: PermisosxestadoInside[];
    Comision: Comision[]
    tipos_permiso_id: number;
}


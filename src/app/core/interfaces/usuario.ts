export interface UsuarioAuth {
    email: string;
    contrasena: string;
}

export interface Usuario {
    id: number;
    tipo_identificacion: string;
    identificacion: number;
    nombre: string;
    apellido: string;
    email: string;
    estado: number;
    contrasena: string;
    dia_disponible: number;
    createdAt: Date;
    fecha_actualizacion: Date;
    departamentos_id: number;
    roles_id: number;
    departamentos: {
      nombre: string;
      facultad: {
        nombre: string;
      };
    };
  }

export interface UsuarioSignup extends Omit<Usuario, "departamentos" | "createdAt" | "dia_disponible" | "estado" | "fecha_actualizacion" > {

}

export interface UsuarioResponse {
    usuario: Usuario;
    token: string;
    expiresIn: string;
}
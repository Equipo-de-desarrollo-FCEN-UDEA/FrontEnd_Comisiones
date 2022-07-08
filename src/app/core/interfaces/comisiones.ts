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
export interface Comision {
    id:                      number;
    fecha_inicio:            Date;
    fecha_fin:               Date;
    fecha_resolucion:        Date;
    resolucion:              string;
    justificacion:           string;
    idioma:                  string;
    lugar:                   string;
    updatedAt:               Date;
    createdAt:               Date;
    tipos_comision_id:       number;
    usuarios:{
      nombre: string;
      apellido: string;
  
  
      departamentos: {
        nombre: string;
        facultades:{
          nombre: string
        }
      }
    }
    tipos_comision:          TiposComision;
    documentos:              any[];
    cumplidos:               any[];
    nombreEstadoActual: string;
    estadoActual: {
      createdAt: Date;
      intermediate_estados: { nombre: string };
    }
  
  intermediate_comisiones: [
    {
      createdAt: Date;
      fecha_actualizacion: Date;
      intermediate_estados: {
        nombre: string;
      };
    }
  ]
  
  
  };
  
  
  export interface intermediate_comisiones {
    createdAt: Date;
    fecha_actualizacion: Date;
    intermediate_estados: {
      nombre: string;}
  
    }
  
  
  export interface TiposComision {
    nombre: string;
  }
  
  
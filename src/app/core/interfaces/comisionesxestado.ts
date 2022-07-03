export interface ComisionEstados {
    id:                      number;
    observacion:             string;
    createdAt:               Date;
    comisiones_id:           number;
    estados_id:              number;
    intermediate_comisiones: IntermediateComisiones;
    //intermediate_estados:    IntermediateEstados;
  }
  
  export interface IntermediateComisiones {
    id:       number;
    usuarios: Usuarios;
  }
  
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
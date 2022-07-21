export interface PlanTrabajo {
    semestre:                  string;
    registro:                  string;
    tipo_vinculacion:          string;
    tiempo_parcial:            number;
    actividades_docencia:      ActividadesDocencia[];
    actividades_investigacion: ActividadesInvestigacion[];
    actividades_extension:     ActividadesExtension[];
    administracion_academica:  AdministracionAcademica[];
    otras_actividades:         OtrasActividade[];
    seguimiento_actividades:   SeguimientoActividade[];
    jornada_trabajo:           JornadaTrabajo[];
    observaciones_generales:   string;
}

export interface ActividadesDocencia {
    identificacion_actividad: IdentificacionActividad;
    numero_estudiantes:       number;
    nivel:                    string;
    horas_semana:             HorasSemana;
    total_horas:              TotalHoras;
}

export interface HorasSemana {
    T:  string;
    TP: string;
    P:  string;
}

export interface IdentificacionActividad {
    codigo: string;
    grupo:  string;
    nombre: string;
}

export interface TotalHoras {
    semanal:   number;
    semestral: number;
}

export interface ActividadesExtension {
    codigo:                   string;
    identificacion_actividad: string;
    responsabilidad:          string;
    costo_responsable:        string;
    programa_beneficiario:    string;
    horas_semana:             number;
    horas_semestre:           number;
}

export interface ActividadesInvestigacion {
    codigo:                  string;
    identificacion_proyecto: string;
    responsabilidad:         string;
    costo_responsable:       string;
    acta_respaldo:           string;
    horas_semestre:          number;
}

export interface AdministracionAcademica {
    cargo:                string;
    horas_semestre:       number;
    otras_actividades:    string;
    otras_horas_semestre: number;
}

export interface JornadaTrabajo {
    mañana: string;
    tarde:  string;
}

export interface OtrasActividade {
    identificacion_actividad: string;
    horas_semestre:           number;
}

export interface SeguimientoActividade {
    identificacion_actividad: string;
    fecha_1:                  string;
    fecha2:                   string;
    otros:                    string;
}

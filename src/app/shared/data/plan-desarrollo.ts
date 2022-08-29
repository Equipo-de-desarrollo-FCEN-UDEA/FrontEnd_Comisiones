export interface Objetivo {
    descripcion: string;
}

export interface Tema {
    titulo: string;
    subtitulo: string;
    objetivos?: Objetivo[];
}

// export var objetivos: Objetivo[] = [
//     {}
// ]

export var temas : Tema[] = [
    {
        titulo: `
        Formación integral de ciudadanos con la articulación y el desarrollo de las funciones misionales, desde los territorios y en conexión con el mundo`,
        subtitulo: `Una universidad humanista, de investigación e innovadora, conectada con el mundo y comprometida con la transformación de sí misma y de la sociedad.`,
        
        objetivos: [
            {
                descripcion: `Articular la investigación y la extensión a la docencia para la formación integral de excelencia académica. `,
            },
            {
                descripcion: `Fortalecer todas las expresiones de las artes y las culturas, que posicionen a la Universidad como referente humanista y cultural para el encuentro y el intercambio de la comunidad universitaria y la sociedad.`,
            },
            {
                descripcion: `Potenciar sus patrimonios en función del desarrollo científico y cultural de la sociedad, en los territorios.`,
            },
            {
                descripcion: `Fomentar el avance y la diversidad en la generación, aplicación y apropiación del conocimiento.`,
            },
            {
                descripcion: `Fomentar la innovación para la comprensión y solución de problemas y la potenciación de capacidades hacia la transformación de la Universidad y de los territorios.`,
            }
        ]


    },
    {
        titulo: `Ciclos de vida de la comunidad universitaria`,
        subtitulo: `Encuentro de proyectos de vida y diálogos de saberes.`,
        objetivos: [
            {
                descripcion: `Contribuir a la formación integral de los estudiantes como aporte de la Universidad a la sociedad.`
            },
            {
                descripcion: `Fortalecer la formación integral de los profesores hacia la construcción de comunidad universitaria.`
            },
            {
                descripcion: `Fortalecer la formación integral del personal administrativo hacia la construcción de comunidad universitaria.`
            },
            {
                descripcion: `Consolidar los vínculos de egresados, jubilados y pensionados con la vida universitaria.`
            }
        ]
    },
    {
        titulo: `Democracia, gobierno universitario y convivencia`,
        subtitulo: `Una universidad democrática, transparente y abierta a la sociedad.`,
        objetivos: [
            {
                descripcion: `Implementar procesos de formación ciudadana en la construcción de una cultura política democrática, que guíen la reflexión y actuación de los integrantes de la comunidad universitaria. `,
            },
            {
                descripcion: `Fomentar la democracia en el gobierno universitario y los mecanismos de participación, de modo que la comunidad universitaria fortalezca los procesos de toma de decisiones.`
            },
            {
                descripcion: `Garantizar el ejercicio del control sobre las actuaciones de los órganos de gobierno y las autoridades universitarias, que asegure la transparencia de su gestión.`
            },
            {
                descripcion: `Fortalecer los campus como espacios públicos adecuados para la comunidad universitaria y la sociedad, que garanticen la convivencia entre quienes los habitan y los visitan respetando su destinación para las actividades misionales.`
            },
        ]
    },
    {
        titulo: `Gestión administrativa y del financiamiento`,
        subtitulo: `Una gestión integrada que transforma.`,
        objetivos: [
            {
                descripcion: `Desarrollar capacidades para la anticipación, orientación y evaluación institucionales, que le permitan a la Universidad la toma estratégica de decisiones frente a su presencia y relación con el entorno.`
            },
            {
                descripcion: `Desarrollar capacidades para el aprendizaje e innovación que permitan a la Universidad mejorar y transformar sus procesos y prácticas.`
            },
            {
                descripcion: `Consolidar la descentralización y desconcentración de estructuras, procesos y recursos, que le permitan a la Universidad la flexibilización y la sostenibilidad de la operación interna, y la mejora de la proyección y autonomía en los territorios en los que tiene presencia.`
            },
            {
                descripcion: `Disponer de un sistema integral de comunicaciones que favorezca el relacionamiento de la Universidad con la comunidad interna y externa, que visibilice su quehacer académico, científico, social y cultural.`
            },
            {
                descripcion: `Disponer de tecnologías informáticas integradas para el direccionamiento y soporte de los procesos académicos y administrativos de la Institución de manera eficiente.`
            },
            {
                descripcion: `Mejorar la infraestructura física de la Universidad en respuesta a las necesidades académicas y administrativas, las condiciones particulares de la comunidad universitaria y las políticas de responsabilidad social y ambiental.`
            },
            {
                descripcion: `Mejorar la gestión del financiamiento y la administración de los recursos financieros para inversión y sostenibilidad universitarias, en el marco de actuación de una institución de educación superior pública.`
            }
        ]
    },
    {
        titulo: `Compromiso de la Universidad con la construcción de paz, equidad, inclusión e interculturalidad`,
        subtitulo: `Una universidad equitativa, inclusiva e intercultural que siembra la paz con enfoque territorial e integral.`,
        objetivos: [
            {
                descripcion: `Aportar a la solución de problemáticas territoriales asociadas a los posacuerdos, con propuestas académicas y saberes ancestrales al servicio de la educación para la paz. `
            },
            {
                descripcion: `Acompañar a los grupos poblacionales en sus procesos de construcción de paz, equidad, inclusión e interculturalidad como parte de su relación con la comunidad universitaria y con la sociedad.`,
            },
            {
                descripcion: `Cualificar el quehacer universitario con la apertura del aprendizaje, la enseñanza, el currículo y la construcción del conocimiento a epistemologías y saberes propios de la diversidad de la comunidad universitaria.`
            },
            {
                descripcion: `Fomentar el reconocimiento pleno de los derechos, de tal modo que se garanticen las diversidades y la vida digna, y se eliminen las discriminaciones en el espacio universitario.`
            }
        ]
    },
    {
        titulo: `Contribuciones de la Universidad a la gestión del ambiente y la biodiversidad`,
        subtitulo: `Una universidad biodiversa y ambientalmente responsable.`,
        objetivos: [
            {
                descripcion: `Consolidar una cultura y una ética universitarias basadas en el respeto por el ambiente y la biodiversidad en el marco de los Objetivos de Desarrollo Sostenible.`
            },
            {
                descripcion: `Participar activamente en la formulación y evaluación de políticas públicas ambientales y de responsabilidad ambiental con diferentes sectores sociales.`,
            },
            {
                descripcion: `Promover la apropiación social del conocimiento y el diálogo intercultural en ambiente y biodiversidad con los diferentes actores sociales en el territorio.`
            }
        ]
    }
]
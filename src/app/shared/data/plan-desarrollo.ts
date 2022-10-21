import { plandesarrollo } from "@interfaces/dedicaciones/plandesarrollo";

export interface Objetivo {
    descripcion: string;
    acciones: string[];
    indicadores?: string[];
}

export interface Tema {
    titulo: string;
    subtitulo: string;
    objetivos?: Objetivo[];
}

let plandeDesarrollo = {temas:[{
    "id": 0,
    "titulo": "Formación integral de ciudadanos con la articulación y el desarrollo de las funciones misionales, desde los territorios y en conexión con el mundo",
    "subtitulo": "Una universidad humanista, de investigación e innovadora, conectada con el mundo y comprometida con la transformación de sí misma y de la sociedad.",
    "objetivos": [
      {
        "id": 1,
        "descripcion": "Articular la investigación y la extensión a la docencia para la formación integral de excelencia académica. ",
        "acciones": [
          {
            "id": 1,
            "descripcion": "Formación integral y humanista comprometida con la construcción de paz, la democracia, la justicia social, el bienestar y la responsabilidad con el ambiente y la biodiversidad."
          },
          {
            "id": 2,
            "descripcion": "Políticas curriculares, con didácticas y pedagogías actualizadas, que atiendan al principio de excelencia académica a través del desarrollo de las disciplinas y las profesiones, la integración de saberes, la solución de problemas y la integración de los egresados a la sociedad."
          },
          {
            "id": 3,
            "descripcion": "Programas de posgrado y pregrado que interroguen problemas globales y locales, así como disciplinares."
          },
          {
            "id": 4,
            "descripcion": "Cobertura de posgrados aumentada con criterios de excelencia académica."
          },
          {
            "id": 5,
            "descripcion": "Comunidades académicas consolidadas para, desde y con los territorios."
          },
          {
            "id": 6,
            "descripcion": "Procesos de internacionalización implementados con una visión geopolítica, que conecten la Universidad con el mundo y le permitan posicionarse como destino y referente académico."
          },
          {
            "id": 7,
            "descripcion": "Procesos de autoevaluación instaurados como cultura universitaria, con planes de mejoramiento en los procesos académicos."
          }
        ],
        "indicadores": [
          {
            "id": 1,
            "descripcion": "Número de cursos de pregrado que integren o combinen asignaturas en distintas modalidades. Desarrollo de las funciones misionales, desde los territorios y enconexión con el mundo."
          },
          {
            "id": 2,
            "descripcion": "Número de programas depregrado que esten en armonización curricular."
          },
          {
            "id": 3,
            "descripcion": "Número de estrategias didacticas innovadoras aplicadas en los programas de pregrado y posgrado en correspondencia con los cambios en los entornos de aprendizaje. "
          },
          {
            "id": 4,
            "descripcion": "Número de integrantes de la comunidad universitaria participando en la nueva plataformade fortalecimiento de capacidades en internacionalización, interculturalidad y ciudadania global. "
          },
          {
            "id": 5,
            "descripcion": "Número de aliados estratégicos internacionales con los que se realizan actividades de cooperaci6n cientifica, docente y de extension por ario. "
          },
          {
            "id": 6,
            "descripcion": "Número de participantes en los cursos ofertados en el marco de formación complementaria, deportiva, cultural y de Bienestar. "
          },
          {
            "id": 7,
            "descripcion": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 8,
            "descripcion": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 9,
            "descripcion": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 10,
            "descripcion": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 11,
            "descripcion": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 12,
            "descripcion": "Número proyectos de innovación social. "
          }
        ]
      },
      {
        "id": 2,
        "descripcion": "Fortalecer todas las expresiones de las artes y las culturas, que posicionen a la Universidad como referente humanista y cultural para el encuentro y el intercambio de la comunidad universitaria y la sociedad.",
        "acciones": [
          {
            "id": 8,
            "descripcion": "Políticas y estrategias de cultura, implementadas."
          },
          {
            "id": 9,
            "descripcion": "Acciones artísticas y culturales integradas en el desarrollo de las funciones misionales."
          },
          {
            "id": 10,
            "descripcion": "Estrategias realizadas para la creación e investigación artística y cultural."
          },
          {
            "id": 11,
            "descripcion": "Actividades interculturales desarrolladas en los territorios."
          }
        ],
        "indicadores": [
          {
            "id": 13,
            "descripcion": "Número de eventos culturales y de patrimonio realizados en la Universidad. "
          },
          {
            "id": 14,
            "descripcion": "Número de beneficiarios de la actividad cultural y de patrimonio universitaria. "
          }
        ]
      },
      {
        "id": 3,
        "descripcion": "Potenciar sus patrimonios en función del desarrollo científico y cultural de la sociedad, en los territorios.",
        "acciones": [
          {
            "id": 12,
            "descripcion": "Investigación desarrollada sobre patrimonios."
          },
          {
            "id": 13,
            "descripcion": "Política orgánica de los patrimonios universitarios, implementada."
          },
          {
            "id": 14,
            "descripcion": "Patrimonios conservados, documentados, registrados, divulgados y visibilizados."
          },
          {
            "id": 15,
            "descripcion": "Estrategias para la apropiación de los patrimonios, desarrolladas en sintonía con la diversidad territorial."
          }
        ],
        "indicadores": [
          {
            "id": 15,
            "descripcion": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 16,
            "descripcion": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 17,
            "descripcion": "Número departicipaciones de losestudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 18,
            "descripcion": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 19,
            "descripcion": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 20,
            "descripcion": "Número proyectos de innovaci6n social. "
          },
          {
            "id": 21,
            "descripcion": "Número de eventos culturales y de patrimonio realizados en la Universidad. "
          },
          {
            "id": 22,
            "descripcion": "Número de beneficiarios de la actividad cultural y de patrimonio universitaria. "
          }
        ]
      },
      {
        "id": 4,
        "descripcion": "Fomentar el avance y la diversidad en la generación, aplicación y apropiación del conocimiento.",
        "acciones": [
          {
            "id": 16,
            "descripcion": "Política implementada para el reconocimiento de las diferentes formas organizativas de producción de conocimiento."
          },
          {
            "id": 17,
            "descripcion": "Estrategias para la generación de conocimiento, diversificadas mediante la interculturalidad y el diálogo de saberes."
          },
          {
            "id": 18,
            "descripcion": "Productos de conocimiento reconocidos y valorados de acuerdo con las singularidades disciplinares, contextuales y epistemológicas."
          },
          {
            "id": 19,
            "descripcion": "Estrategias instauradas para el fomento de redes de investigación interdisciplinarias, transdisciplinarias e interculturales."
          },
          {
            "id": 20,
            "descripcion": "Política y estrategias de la ciencia abierta*, implementadas en equilibrio con los criterios de propiedad intelectual respecto de publicaciones, datos, metodologías, métricas y herramientas."
          },
          {
            "id": 21,
            "descripcion": "Estrategias desarrolladas para la apropiación social del conocimiento, y el diálogo de saberes."
          },
          {
            "id": 22,
            "descripcion": "Procesos implementados de difusión, divulgación y visibilización del conocimiento."
          }
        ],
        "indicadores": [
          {
            "id": 23,
            "descripcion": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 24,
            "descripcion": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 25,
            "descripcion": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 26,
            "descripcion": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 27,
            "descripcion": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 28,
            "descripcion": "Número proyectos de innovación social. "
          }
        ]
      },
      {
        "id": 5,
        "descripcion": "Fomentar la innovación para la comprensión y solución de problemas y la potenciación de capacidades hacia la transformación de la Universidad y de los territorios.",
        "acciones": [
          {
            "id": 23,
            "descripcion": "Relación fortalecida de la Universidad con la sociedad para el mejoramiento de las condiciones de vida en el marco de un enfoque territorial."
          },
          {
            "id": 24,
            "descripcion": "Prácticas de cocreación, colaboración y coproducción del conocimiento, promovidas a partir de la interrelación con la sociedad, las empresas y el estado"
          },
          {
            "id": 25,
            "descripcion": "Nuevos proyectos y productos de innovación, desarrollados a partir de resultados de procesos de investigación y docencia."
          },
          {
            "id": 26,
            "descripcion": "Estrategias desarrolladas de emprendimiento basado en conocimiento."
          },
          {
            "id": 27,
            "descripcion": "Procesos de participación de la Universidad en el ciclo de las políticas públicas, implementados en función del desarrollo y fomento de la ciencia, la tecnología y la innovación."
          }
        ],
        "indicadores": [
          {
            "id": 29,
            "descripcion": "Cantidad de publicaciones en bases de datos. "
          },
          {
            "id": 30,
            "descripcion": "Número de citacionesde Google Scholar por año que recibe la UdeA. "
          },
          {
            "id": 31,
            "descripcion": "Número de participaciones de los estudiantes en actividades y estrategias que permiten fortalecerla formación eninvestigación. "
          },
          {
            "id": 32,
            "descripcion": "Número de emprendimientos beneficiados de los nuevos progra más institucionales para el fortalecimiento empresarial. "
          },
          {
            "id": 33,
            "descripcion": "Número de proyectos, convenios y contratos en actividades de ciencia, tecnología, innovación y emprendimiento entre Universidad- Empresa-Estado- Sociedad. "
          },
          {
            "id": 34,
            "descripcion": "Número proyectos de innovación social. "
          }
        ]
      }
    ]
  }, {
    "id": 1,
    "titulo": "Ciclos de vida de la comunidad universitaria",
    "subtitulo": "Encuentro de proyectos de vida y diálogos de saberes.",
    "objetivos": [
      {
        "id": 6,
        "descripcion": "Contribuir a la formación integral de los estudiantes como aporte de la Universidad a la sociedad.",
        "acciones": [
          {
            "id": 28,
            "descripcion": "Estrategias caracterizadas y consolidadas de articulación con los niveles de educación precedente, hacia la mejora de la calidad académica."
          },
          {
            "id": 29,
            "descripcion": "Estrategias complementarias y condiciones, fortalecidas para el desarrollo de potencialidades académicas, científicas, epistemológicas, culturales, éticas, estéticas, deportivas, sociales, ciudadanas y proambientales de los estudiantes, en el marco de lo colectivo y la corresponsabilidad."
          },
          {
            "id": 30,
            "descripcion": "Estrategias de acompañamiento específico, atención especializada, reconocimiento, protección y promoción de la diversidad, desarrolladas hacia la integración de los estudiantes para su buen vivir."
          },
          {
            "id": 31,
            "descripcion": "Estrategias interculturales, pluriversales y plurilingües, implementadas con enfoque territorial en la formación de estudiantes de pregrado y posgrado."
          },
          {
            "id": 32,
            "descripcion": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas que afrontan los estudiantes vulnerables, especialmente los priorizados por los lineamientos de educación superior inclusiva, en sus procesos de aprendizaje y en su participación durante el ciclo de vida universitaria"
          },
          {
            "id": 33,
            "descripcion": "Sistema implementado de caracterización, seguimiento, evaluación a la trayectoria y reconocimiento del desempeño de los estudiantes durante su ciclo de vida universitaria."
          },
          {
            "id": 34,
            "descripcion": "Procesos consolidados de preparación de los estudiantes para el egreso y el ejercicio profesional con responsabilidad social. "
          }
        ],
        "indicadores": [
          {
            "id": 35,
            "descripcion": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 36,
            "descripcion": "Tasa de deserción por semestre."
          },
          {
            "id": 37,
            "descripcion": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 38,
            "descripcion": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 39,
            "descripcion": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 7,
        "descripcion": "Fortalecer la formación integral de los profesores hacia la construcción de comunidad universitaria.",
        "acciones": [
          {
            "id": 35,
            "descripcion": "Procesos mejorados de vinculación planificada en correspondencia con lasnecesidades misionales y con el carácter formativo y humano de los profesores, bajo principios de equidad, igualdad y trabajo digno."
          },
          {
            "id": 36,
            "descripcion": "Procesos fortalecidos para la integración de los profesores a la vida universitaria."
          },
          {
            "id": 37,
            "descripcion": "Estrategias y condiciones académicas, sociales y culturales, fortalecidas para el desarrollo de las actividades profesorales enmarcadas en la práctica permanente del cuidado individual y colectivo, de la Institución y de los bienes públicos."
          },
          {
            "id": 38,
            "descripcion": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas, que afrontan los profesores vulnerables, especialmente con discapacidad, durante su ciclo de vida universitaria."
          },
          {
            "id": 39,
            "descripcion": "Prácticas inclusivas e interculturales consolidadas de cualificación docente, enfocadas al reconocimiento de comportamientos proambientales y de las distintas expresiones de la diversidad, la diferencia epistémica y la pluralidad, presentes en la comunidad universitaria."
          },
          {
            "id": 40,
            "descripcion": "Procesos mejorados de reconocimiento y asignación de estímulos con principios de equidad para los profesores en sus diferentes funciones."
          },
          {
            "id": 41,
            "descripcion": "Comunidades académicas y redes de conocimiento consolidadas para el desarrollo del ejercicio profesoral tanto en el ámbito nacional como internacional"
          },
          {
            "id": 42,
            "descripcion": "Prácticas de gestión de conocimiento incorporadas en la cultura universitaria, que permitan la identificación, la sistematización, la conservación y la difusión de los saberes propios del ejercicio profesoral en los procesos institucionales."
          },
          {
            "id": 43,
            "descripcion": "Procesos mejorados de acompañamiento y preparación para el retiro laboral, que cultiven el desarrollo intelectual, físico y psicoafectivo de los profesores."
          }
        ],
        "indicadores": [
          {
            "id": 40,
            "descripcion": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 41,
            "descripcion": "Tasa de deserción por semestre."
          },
          {
            "id": 42,
            "descripcion": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 43,
            "descripcion": "Porcentaje de profesores que realizan procesos formativos y de cualificación docente ofertados por la Universidad."
          },
          {
            "id": 44,
            "descripcion": "Porcentaje de implementación de teletrabajo."
          },
          {
            "id": 45,
            "descripcion": "Porcentaje planificación y retroalimentación de la labor."
          },
          {
            "id": 46,
            "descripcion": "Número de nuevos empleados vinculados en carrera administrativa por concurso público."
          },
          {
            "id": 47,
            "descripcion": "Número de plazas docentes de tiempo completos equivalentes ocupadas."
          },
          {
            "id": 48,
            "descripcion": "Número de plazas docentes de tiempo completos equivalentes creadas. "
          },
          {
            "id": 49,
            "descripcion": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 50,
            "descripcion": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 8,
        "descripcion": "Fortalecer la formación integral del personal administrativo hacia la construcción de comunidad universitaria.",
        "acciones": [
          {
            "id": 44,
            "descripcion": "Procesos consolidados de vinculación planificados, dinámicos y ágiles de los servidores administrativos, que respondan a las necesidades institucionales bajo principios de equidad, igualdad y trabajo digno."
          },
          {
            "id": 45,
            "descripcion": "Estrategias para el desarrollo de las competencias del ser, el saber y el hacer en la gestión administrativa, en concordancia con las necesidades de bienestar y las condiciones normativas académicas, sociales y culturales, y enmarcadas en el trabajo en equipo, apertura al cambio, el sentido de lo colectivo y la corresponsabilidad."
          },
          {
            "id": 46,
            "descripcion": "Prácticas inclusivas e interculturales consolidadas de cualificación de los servidores administrativos, enfocadas al reconocimiento de comportamientos proambientales y de las distintas expresiones de la diversidad, la diferencia epistémica y la pluralidad, presentes en la comunidad universitaria."
          },
          {
            "id": 47,
            "descripcion": "Prácticas consolidadas de eliminación de barreras comunicativas, tecnológicas, actitudinales, administrativas y académicas que afronten los servidores administrativos vulnerables, especialmente aquellos con discapacidad en su participación durante su ciclo de vida universitaria."
          },
          {
            "id": 48,
            "descripcion": "Procesos mejorados de reconocimiento de logros personales, académicos y profesionales de los servidores administrativos."
          },
          {
            "id": 49,
            "descripcion": "Prácticas de gestión de conocimiento incorporadas en la cultura universitaria que permitan la identificación, la sistematización, la conservación y la difusión de los saberes propios de la gestión administrativa en los procesos institucionales."
          },
          {
            "id": 50,
            "descripcion": "Procesos mejorados de acompañamiento y preparación para el retiro laboral que cultiven el desarrollo intelectual, físico y psicoafectivo de los empleados administrativos."
          }
        ],
        "indicadores": [
          {
            "id": 51,
            "descripcion": "Número de estudiantes beneficiarios de los programas y servicios  orientados a promover la permanencia estudiantil. "
          },
          {
            "id": 52,
            "descripcion": "Tasa de deserción por semestre."
          },
          {
            "id": 53,
            "descripcion": "Número de participantes en actividades desarrolladas para promover el buen vivir en la comunidad universitaria."
          },
          {
            "id": 54,
            "descripcion": "Porcentaje de profesores que realizan procesos formativos y de cualificación docente ofertados por la Universidad."
          },
          {
            "id": 55,
            "descripcion": "Porcentaje de implementación de teletrabajo."
          },
          {
            "id": 56,
            "descripcion": "Porcentaje planificación y retroalimentación de la labor."
          },
          {
            "id": 57,
            "descripcion": "Número de nuevos empleados vinculados en carrera administrativa por concurso público."
          },
          {
            "id": 58,
            "descripcion": "Número de plazas docentes de tiempo completos equivalentes ocupadas."
          },
          {
            "id": 59,
            "descripcion": "Número de plazas docentes de tiempo completos equivalentes creadas. "
          },
          {
            "id": 60,
            "descripcion": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 61,
            "descripcion": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          }
        ]
      },
      {
        "id": 9,
        "descripcion": "Consolidar los vínculos de egresados, jubilados y pensionados con la vida universitaria.",
        "acciones": [
          {
            "id": 51,
            "descripcion": "Procesos de generación de conocimientos, habilidades y destrezas, implementados para la proyección laboral y social de los egresados."
          },
          {
            "id": 52,
            "descripcion": "Estrategias consolidadas para la articulación de los egresados a la vida universitaria. "
          },
          {
            "id": 53,
            "descripcion": "Estrategias fortalecidas de articulación de los profesores y los empleados administrativos jubilados y pensionados en los procesos académicos, administrativos y culturales de la comunidad universitaria."
          }
        ],
        "indicadores": []
      }
    ]
  }, {
    "id": 2,
    "titulo": "Democracia, gobierno universitario y convivencia",
    "subtitulo": "Una universidad democrática, transparente y abierta a la sociedad.",
    "objetivos": [
      {
        "id": 10,
        "descripcion": "Implementar procesos de formación ciudadana en la construcción de una cultura política democrática, que guíen la reflexión y actuación de los integrantes de la comunidad universitaria. ",
        "acciones": [
          {
            "id": 54,
            "descripcion": "Política de formación ciudadana implementada para todos los estamentos de la Universidad, que cualifica el ejercicio de la participación y la cultura política democrática de los universitarios."
          },
          {
            "id": 55,
            "descripcion": "Mecanismos, instancias y espacios permanentes de participación, deliberación y concertación política entre los actores universitarios."
          },
          {
            "id": 56,
            "descripcion": "Reconocimiento y legitimidad de las organizaciones y colectivos universitarios ante el gobierno universitario y sus bases de origen, siempre y cuando actúen dentro del marco de la Constitución, la Ley y las normas universitarias."
          }
        ],
        "indicadores": [
          {
            "id": 62,
            "descripcion": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 63,
            "descripcion": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 11,
        "descripcion": "Fomentar la democracia en el gobierno universitario y los mecanismos de participación, de modo que la comunidad universitaria fortalezca los procesos de toma de decisiones.",
        "acciones": [
          {
            "id": 57,
            "descripcion": "Mecanismos de participación y canales de diálogo establecidos para el fortalecimiento de la toma de decisiones. "
          },
          {
            "id": 58,
            "descripcion": "Consultas reglamentadas que incidan efectivamente en la reforma de los estatutos y reglamentos referidos a los estamentos y en la elección de sus representantes a los órganos de gobierno. "
          },
          {
            "id": 59,
            "descripcion": "Normativa institucional simplificada, actualizada y publicitada, que permita acceder fácilmente a sus contenidos, esté acorde con las transformaciones de la educación superior, y se ajuste a las condiciones y particularidades institucionales en su construcción y aplicación."
          },
          {
            "id": 60,
            "descripcion": "Órganos de gobierno y representaciones con reglamentos internos ajustados, que definan los principios de consecutividad, identidad y conexidad para el trámite de proyectos normativos, y las materias sobre las cuales rigen procedimientos, quórums o mayorías especiales."
          }
        ],
        "indicadores": [
          {
            "id": 64,
            "descripcion": "Número de temas de interés institucional priorizados que se actualizan desde lo normativo"
          },
          {
            "id": 65,
            "descripcion": "Número de talleres de apoyo para la deliberación y proyección de la reforma de regulaciones especificas, priorizados por la Dirección Jurídica. "
          },
          {
            "id": 66,
            "descripcion": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 67,
            "descripcion": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 12,
        "descripcion": "Garantizar el ejercicio del control sobre las actuaciones de los órganos de gobierno y las autoridades universitarias, que asegure la transparencia de su gestión.",
        "acciones": [
          {
            "id": 61,
            "descripcion": "Mecanismos y espacios fortalecidos de control a las actuaciones de las autoridades y sus órganos de gobierno en todos los niveles de decisión administrativa y académica."
          },
          {
            "id": 62,
            "descripcion": "Política institucional de transparencia, desarrollada en el gobierno universitario, que garantice el acceso ágil y oportuno a la información relevante para la comunidad universitaria y la sociedad."
          },
          {
            "id": 63,
            "descripcion": "Rendición pública y periódica de cuentas ajustada a la función institucional y a la gestión, que fomente el ejercicio autocrítico y la retroalimentación de la comunidad universitaria y de la sociedad."
          }
        ],
        "indicadores": [
          {
            "id": 68,
            "descripcion": "Número de eventos de formación y divulgación sobre temas de gobierno, democracia, participación, ciudadanía y convivencia  para la comunidad universitaria. "
          },
          {
            "id": 69,
            "descripcion": "Nivel de participación de la comunidad universitaria en los procesos de elección y consulta para la designación de autoridades y de representantes en órganos de decisión universitarios. "
          }
        ]
      },
      {
        "id": 13,
        "descripcion": "Fortalecer los campus como espacios públicos adecuados para la comunidad universitaria y la sociedad, que garanticen la convivencia entre quienes los habitan y los visitan respetando su destinación para las actividades misionales.",
        "acciones": [
          {
            "id": 64,
            "descripcion": "Estrategias desarrolladas de prevención, promoción, atención y seguimiento a la convivencia, que partan de la capacidad de autorregulación de los actores y del cumplimiento de deberes y responsabilidades."
          },
          {
            "id": 65,
            "descripcion": "Sistema de resolución de conflictos implementado, que contemple fases previas de mediación y medidas alternativas sancionatorias."
          },
          {
            "id": 66,
            "descripcion": "Coordinación con autoridades externas en el tratamiento de la ilegalidad en los campus, que garanticen el respeto a los derechos humanos de la comunidad y la continuidad de las actividades universitarias."
          },
          {
            "id": 67,
            "descripcion": "Campus consolidados como espacios de participación y de construcción de comunidad universitaria."
          },
          {
            "id": 68,
            "descripcion": "Política de espacios públicos de los campus implementada dentro del marco normativo y respetando siempre la misión de la Universidad."
          }
        ],
        "indicadores": []
      }
    ]
  }, {
    "id": 3,
    "titulo": "Gestión administrativa y del financiamiento",
    "subtitulo": "Una gestión integrada que transforma.",
    "objetivos": [
      {
        "id": 14,
        "descripcion": "Desarrollar capacidades para la anticipación, orientación y evaluación institucionales, que le permitan a la Universidad la toma estratégica de decisiones frente a su presencia y relación con el entorno.",
        "acciones": [
          {
            "id": 69,
            "descripcion": "Modelo de gestión integral implementado para el direccionamiento y la evaluación institucional."
          },
          {
            "id": 70,
            "descripcion": "Procesos incorporados para el análisis estratégico del entorno."
          },
          {
            "id": 71,
            "descripcion": "Capacidades instaladas para el direccionamiento estratégico de la Institución"
          },
          {
            "id": 72,
            "descripcion": "Capacidades para la gestión de riesgos, implementadas e integradas al direccionamiento estratégico."
          }
        ],
        "indicadores": [
          {
            "id": 70,
            "descripcion": "Nivel de optimización de recursos en los nuevos procesos académicos o administrativos intervenidos. "
          },
          {
            "id": 71,
            "descripcion": "Número de procesos académicos y administrativos prioritarios estandarizados"
          }
        ]
      },
      {
        "id": 15,
        "descripcion": "Desarrollar capacidades para el aprendizaje e innovación que permitan a la Universidad mejorar y transformar sus procesos y prácticas.",
        "acciones": [
          {
            "id": 73,
            "descripcion": "Sistema de gestión del conocimiento implementado para la Universidad."
          },
          {
            "id": 74,
            "descripcion": "Sistema de innovación implementado para la gestión administrativa y del financiamiento."
          },
          {
            "id": 75,
            "descripcion": "Capacidades instaladas para el aprendizaje y la innovación universitaria."
          }
        ],
        "indicadores": []
      },
      {
        "id": 16,
        "descripcion": "Consolidar la descentralización y desconcentración de estructuras, procesos y recursos, que le permitan a la Universidad la flexibilización y la sostenibilidad de la operación interna, y la mejora de la proyección y autonomía en los territorios en los que tiene presencia.",
        "acciones": [
          {
            "id": 76,
            "descripcion": "Procesos académicos y administrativos descentralizados en seccionales y sedes, con autonomía, de acuerdo con las particularidades de los territorios y las capacidades institucionales."
          },
          {
            "id": 77,
            "descripcion": "Procesos de la administración central desconcentrados."
          },
          {
            "id": 78,
            "descripcion": "Enfoque implementado de trabajo por procesos y por proyectos."
          },
          {
            "id": 79,
            "descripcion": "Estructuras académico-administrativas flexibles para el desarrollo misional en correspondencia con la integración de saberes y la gestión del conocimiento."
          },
          {
            "id": 80,
            "descripcion": "Capacidades instaladas para la alineación, coordinación y colaboración en y entre unidades académicas y administrativas."
          }
        ],
        "indicadores": [
          {
            "id": 72,
            "descripcion": "Nivel de optimización de recursos en los nuevos procesos académicos o administrativos intervenidos. "
          },
          {
            "id": 73,
            "descripcion": "Número de procesos académicos y administrativos prioritarios estandarizados."
          }
        ]
      },
      {
        "id": 17,
        "descripcion": "Disponer de un sistema integral de comunicaciones que favorezca el relacionamiento de la Universidad con la comunidad interna y externa, que visibilice su quehacer académico, científico, social y cultural.",
        "acciones": [
          {
            "id": 81,
            "descripcion": "Sistema de comunicaciones institucional integrado."
          },
          {
            "id": 82,
            "descripcion": "Mecanismos de comunicación e información institucional accesibles a todos los públicos, desarrollados con estándares de calidad, pertinencia y oportunidad."
          },
          {
            "id": 83,
            "descripcion": "Estrategias integrales instauradas para la proyección y posicionamiento institucionales."
          }
        ],
        "indicadores": [
          {
            "id": 74,
            "descripcion": "Índice de madurez de la transformación digital."
          },
          {
            "id": 75,
            "descripcion": "Índice de apropiación de la transformación digital. "
          }
        ]
      },
      {
        "id": 18,
        "descripcion": "Disponer de tecnologías informáticas integradas para el direccionamiento y soporte de los procesos académicos y administrativos de la Institución de manera eficiente.",
        "acciones": [
          {
            "id": 84,
            "descripcion": "Infraestructura tecnológica y sistemas de información integrados, planificados y administrados bajo condiciones de seguridad, gobernabilidad y usabilidad e incorporados estratégicamente a las necesidades de la Universidad"
          },
          {
            "id": 85,
            "descripcion": "Estrategias implementadas de gobierno en línea y de accesibilidad a la información dirigidas a los públicos internos y externos."
          },
          {
            "id": 86,
            "descripcion": "Estrategias de desarrollo de la tecnología informática acordes con las propuestas académicas y los procesos administrativos."
          },
          {
            "id": 87,
            "descripcion": "Procesos de transformación digital incorporados en las propuestas académicas y procesos administrativos."
          }
        ],
        "indicadores": []
      },
      {
        "id": 19,
        "descripcion": "Mejorar la infraestructura física de la Universidad en respuesta a las necesidades académicas y administrativas, las condiciones particulares de la comunidad universitaria y las políticas de responsabilidad social y ambiental.",
        "acciones": [
          {
            "id": 88,
            "descripcion": "Infraestructura física universitaria incrementada."
          },
          {
            "id": 89,
            "descripcion": "Espacios físicos adecuados, soportados logísticamente y habilitados en relación con las necesidades generales y específicas de los procesos y de la comunidad universitaria."
          },
          {
            "id": 90,
            "descripcion": "Infraestructura física y logística planeada e instalada de manera eficiente y con gestión del ambiente y la biodiversidad."
          },
          {
            "id": 91,
            "descripcion": "Esquemas de colaboración establecidos para el crecimiento y desarrollo de la infraestructura física con instituciones y organizaciones públicas y privadas."
          }
        ],
        "indicadores": [
          {
            "id": 76,
            "descripcion": "Número de metros cuadrados construídos para adaptar la infraestructura universitaria a nuevas dinámicas institucionales "
          },
          {
            "id": 77,
            "descripcion": "Número de metros cuadrados adecuados para adaptar la infraestructura universitaria a nuevas dinámicas institucionales. "
          }
        ]
      },
      {
        "id": 20,
        "descripcion": "Mejorar la gestión del financiamiento y la administración de los recursos financieros para inversión y sostenibilidad universitarias, en el marco de actuación de una institución de educación superior pública.",
        "acciones": [
          {
            "id": 92,
            "descripcion": "Base presupuestal incrementada a partir de recursos del Estado."
          },
          {
            "id": 93,
            "descripcion": "Recursos financieros para proyectos especiales, incrementados a partir de nuevas fuentes de financiación territoriales."
          },
          {
            "id": 94,
            "descripcion": "Nuevos recursos financieros obtenidos mediante la articulación y asociación con el Estado, la empresa, organismos internacionales, organizaciones sociales y pares académicos o científicos."
          },
          {
            "id": 95,
            "descripcion": "Administración descentralizada de los recursos financieros de la Universidad."
          },
          {
            "id": 96,
            "descripcion": "Recursos financieros administrados con transparencia, eficiencia y eficacia."
          },
          {
            "id": 97,
            "descripcion": "Nuevos fondos de apoyo financiero instaurados para el desarrollo de las funciones misionales."
          },
          {
            "id": 98,
            "descripcion": "Relaciones de mutuo beneficio instauradas con entidades externas en las que la Universidad tiene participación. "
          },
          {
            "id": 99,
            "descripcion": "Riesgos financieros gestionados y mitigados, derivados de la participación de la Universidad en otras entidades. "
          }
        ],
        "indicadores": []
      }
    ]
  }, {
    "id": 4,
    "titulo": "Compromiso de la Universidad con la construcción de paz, equidad, inclusión e interculturalidad",
    "subtitulo": "Una universidad equitativa, inclusiva e intercultural que siembra la paz con enfoque territorial e integral.",
    "objetivos": [
      {
        "id": 21,
        "descripcion": "Aportar a la solución de problemáticas territoriales asociadas a los posacuerdos, con propuestas académicas y saberes ancestrales al servicio de la educación para la paz. ",
        "acciones": [
          {
            "id": 100,
            "descripcion": "Intervenciones ejecutadas, desde la misión de la universidad, sobre los procesos, diseñados por el gobierno nacional, con sus estrategias para el reconocimiento, visibilización y acompañamiento de las víctimas del conflicto armado desde procesos de memoria, búsqueda de la verdad, reparación integral y garantías de no repetición."
          },
          {
            "id": 101,
            "descripcion": "Acciones desarrolladas desde los ejes misionales, que respondan a las necesidades regionales y aporten a la comprensión de los conflictos violentos que perviven y se reactualizan en las regiones afectadas por el conflicto armado."
          },
          {
            "id": 102,
            "descripcion": "Formación para la participación política y social, desarrollada desde el ejercicio de derechos y obligaciones ciudadanos, derivados de la construcción de paz por parte de comunidades, regiones y territorios afectados por el conflicto armado."
          }
        ],
        "indicadores": [
          {
            "id": 78,
            "descripcion": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 79,
            "descripcion": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 80,
            "descripcion": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 22,
        "descripcion": "Acompañar a los grupos poblacionales en sus procesos de construcción de paz, equidad, inclusión e interculturalidad como parte de su relación con la comunidad universitaria y con la sociedad.",
        "acciones": [
          {
            "id": 103,
            "descripcion": "Centro permanente de tratamiento de conflictos constituido y que cuente con estrategias enriquecidas desde la diversidad epistémica."
          },
          {
            "id": 104,
            "descripcion": "Estrategias para la generación y apropiación del conocimiento sobre las causas del conflicto y los procesos de construcción de paz."
          },
          {
            "id": 105,
            "descripcion": "Sistema Universitario de Información sobre Memoria constituido para la gestión documental y la unificación de proyectos, estudios y actividades en el marco de las reparaciones individuales y colectivas."
          },
          {
            "id": 106,
            "descripcion": "Ejercicios adelantados desde la Universidad para la reconstrucción de la memoria de los estamentos, y de búsqueda de la verdad y reparación como víctima colectiva del conflicto armado."
          },
          {
            "id": 107,
            "descripcion": "Formación adelantada para el desarrollo de capacidades para la reintegración a la vida civil de los excombatientes y acompañamiento a las víctimas mediante la generación de relaciones desde el respeto a la vida, a los derechos y al pluralismo en las regiones."
          }
        ],
        "indicadores": [
          {
            "id": 81,
            "descripcion": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 82,
            "descripcion": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          },
          {
            "id": 83,
            "descripcion": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 84,
            "descripcion": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 85,
            "descripcion": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 23,
        "descripcion": "Cualificar el quehacer universitario con la apertura del aprendizaje, la enseñanza, el currículo y la construcción del conocimiento a epistemologías y saberes propios de la diversidad de la comunidad universitaria.",
        "acciones": [
          {
            "id": 108,
            "descripcion": "Educación para la paz por intermedio de estrategias que promuevan la noviolencia con propuestas pedagógicas que podrán ser enriquecidas con saberes ancestrales, prácticas socio-políticas y formación en derechos humanos."
          },
          {
            "id": 109,
            "descripcion": "Políticas de enfoque diferencial, de género e interculturalidad consolidadas en la investigación y la extensión, que aporten al conocimiento sobre la Universidad y la sociedad."
          }
        ],
        "indicadores": [
          {
            "id": 86,
            "descripcion": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 87,
            "descripcion": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 88,
            "descripcion": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      },
      {
        "id": 24,
        "descripcion": "Fomentar el reconocimiento pleno de los derechos, de tal modo que se garanticen las diversidades y la vida digna, y se eliminen las discriminaciones en el espacio universitario.",
        "acciones": [
          {
            "id": 110,
            "descripcion": "Políticas contra el acoso, la violencia y la discriminación basados en el sexo, la orientación sexual y la identidad de género, desarrolladas desde la sensibilización, la atención integral y la generación de protocolos que promuevan condiciones de convivencia y derechos humanos en la Universidad."
          },
          {
            "id": 111,
            "descripcion": "Gestión para la apropiación social e institucional del conocimiento sobre la inclusión en la educación superior, desarrollada con base en los lineamientos políticos y avances teóricos latinoamericanos y globales."
          }
        ],
        "indicadores": [
          {
            "id": 89,
            "descripcion": "Número de estudiantes con capacidades diversas participes o beneficiarios de las actividades, programas y servicios de la Dirección de Bienestar Universitario "
          },
          {
            "id": 90,
            "descripcion": "Nivel de implementación de adecuaciones en la CiudadnUniversitaria que faciliten procesos de inclusión de personas con capacidades diversas (fase: circulación y  espacio público)"
          },
          {
            "id": 91,
            "descripcion": "Número de programas académicos de pregrado interdisciplinarios ofertados con enfoque en paz. "
          },
          {
            "id": 92,
            "descripcion": "Número de proyectos de investigación y extensión con comunidades, que fortalezcan los procesos de construccion de paz con enfoque territorial. "
          },
          {
            "id": 93,
            "descripcion": "Número de participantes en espacios educativos, políticos y culturales implementados para la construcción de paz."
          }
        ]
      }
    ]
  }, {
    "id": 5,
    "titulo": "Contribuciones de la Universidad a la gestión del ambiente y la biodiversidad",
    "subtitulo": "Una universidad biodiversa y ambientalmente responsable.",
    "objetivos": [
      {
        "id": 25,
        "descripcion": "Consolidar una cultura y una ética universitarias basadas en el respeto por el ambiente y la biodiversidad en el marco de los Objetivos de Desarrollo Sostenible.",
        "acciones": [
          {
            "id": 112,
            "descripcion": "Acciones de gestión ambiental articuladas al Sistema de Gestión Ambiental."
          },
          {
            "id": 113,
            "descripcion": "Estrategias para la formación transversalizadas por la educación ambiental."
          },
          {
            "id": 114,
            "descripcion": "Prácticas éticas y responsables con el ambiente y la biodiversidad, realizadas por la comunidad universitaria."
          },
          {
            "id": 115,
            "descripcion": "Proyectos de ampliación de infraestructura ambientalmente sostenibles. "
          },
          {
            "id": 116,
            "descripcion": "Agendas implementadas de investigación y formación en ambiente y biodiversidad."
          },
          {
            "id": 117,
            "descripcion": "Colecciones y patrimonio ambiental conservados, documentados, registrados, divulgados y visibilizados, que generen estrategias para su apropiación."
          },
          {
            "id": 118,
            "descripcion": "Estrategias implementadas para la asesoría y el acompañamiento jurídico a la investigación científica en ambiente y biodiversidad."
          }
        ],
        "indicadores": [
          {
            "id": 94,
            "descripcion": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 95,
            "descripcion": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      },
      {
        "id": 26,
        "descripcion": "Participar activamente en la formulación y evaluación de políticas públicas ambientales y de responsabilidad ambiental con diferentes sectores sociales.",
        "acciones": [
          {
            "id": 119,
            "descripcion": "Estrategias de producción, difusión, divulgación y visibilización del conocimiento en ambiente y biodiversidad, desarrolladas para orientar la toma de decisiones."
          },
          {
            "id": 120,
            "descripcion": "Mecanismos instalados de articulación entre el Sistema Nacional Ambiental, los tomadores de decisiones y la Universidad."
          }
        ],
        "indicadores": [
          {
            "id": 96,
            "descripcion": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 97,
            "descripcion": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      },
      {
        "id": 27,
        "descripcion": "Promover la apropiación social del conocimiento y el diálogo intercultural en ambiente y biodiversidad con los diferentes actores sociales en el territorio.",
        "acciones": [
          {
            "id": 121,
            "descripcion": "Estrategias desarrolladas de comunicación y divulgación en ambiente y biodiversidad con actores sociales en el territorio."
          },
          {
            "id": 122,
            "descripcion": "Eventos académicos y de extensión pertinentes en gestión del ambiente y biodiversidad, fortalecidos."
          },
          {
            "id": 123,
            "descripcion": "Pedagogías y diálogos de saberes interdisciplinares e interculturales incorporados a la gestión del ambiente y la biodiversidad."
          },
          {
            "id": 124,
            "descripcion": "Capacidades y oportunidades de las poblaciones locales, fortalecidas para la gestión del ambiente y de la biodiversidad, con énfasis en los territorios afectados por el conflicto armado."
          }
        ],
        "indicadores": [
          {
            "id": 98,
            "descripcion": "Porcentaje de avance en la implementación de la política de gestión ambiental. "
          },
          {
            "id": 99,
            "descripcion": "Número de iniciativas ambientales en los campus y sedes universitarios. "
          }
        ]
      }
    ]
  }] }

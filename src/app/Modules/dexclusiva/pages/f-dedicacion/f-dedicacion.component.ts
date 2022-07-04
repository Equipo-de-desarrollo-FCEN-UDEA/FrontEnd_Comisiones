import { Component, OnInit } from '@angular/core';
import { Dexclusiva } from '@interfaces/dexclusiva';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DexclusivaService } from '@services/dexclusiva.service';
import { CookieService } from 'ngx-cookie-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas);

@Component({
  selector: 'app-f-dedicacion',
  templateUrl: './f-dedicacion.component.html',
  styleUrls: ['./f-dedicacion.component.scss']
})
export class FDedicacionComponent implements OnInit {
// Icons

  faPlus = faPlus;



  constructor(
    // private : UserSvc Falta entregar información del usuario
    private fb : FormBuilder,
    private dexclusivaSvc: DexclusivaService,
    private cookie: CookieService
  ) { }
  
  public unidades = [
    'Instituto de Química, Facultad de Ciencias Exactas y Naturales',
  ]

  public campos = [
    'Docencia',
    'Extensión',
    'Investigación',
    'Administración'
  ]

  public Usuario = {
    "id": 13,
    "tipo_identificacion": "CC",
    // "identificacion": 1017198111,
    "nombre": "mariana",
    "apellido": "castrillon",
    "email": "mariana.castrillonr@udea.edu.co",
    "estado": 1,
    "contrasena": "$2b$10$LjqmmR2oeX3IfIbfxr9ne.PSepkeCwhs2PDk7jbGyKPner86UL1Ba",
    "dia_disponible": 3,
    "createdAt": "2022-06-28T19:36:36.000Z",
    "updatedAt": "2022-06-28T19:36:36.000Z",
    "departamentos_id": 1,
    "roles_id": 5,
    "roles": {
    "nombre": "USUARIO"
    },
    "departamentos": {
    "nombre": "VICEDECANATURAFCEN",
    "facultades": {
    "nombre": "FCEN"
    }
    },
    "comisiones": [
    {
    "id": 2,
    "fecha_inicio": "2022-02-20T00:00:00.000Z",
    "fecha_fin": "2022-02-21T00:00:00.000Z",
    "fecha_resolucion": "2022-02-20T00:00:00.000Z",
    "resolucion": "1111",
    "justificacion": "blabla",
    "idioma": "blabla",
    "lugar": "blabla",
    "tipos_comision_id": 1,
    "usuarios_id": 13
    }
    ]
    }

  private isEmailValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;
  private fExclusiva : Dexclusiva = {
    titulo: '',
    tiempo_solicitado: 0,
    campo_modalidad: '',
    descripcion_comprobante: '',
    tema_estrategico: [],
    objetivo_estrategico_desarrollo: [],
    metas: [],
    indicador: [],
    acciones_estrategicas: [],
    objetivo_estrategico_institucional: [],
    productos: []

  };

  fBasicInfo = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    identificacion: [Number, [Validators.required, Validators.min(1000), Validators.max(999999999999)]],
    extension_oficina: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    celular: [Number, [Validators.min(1000000000), Validators.max(9999999999)]],
    email: ['',[Validators.required, Validators.pattern(this.isEmailValid)]],
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    tiempo_solicitado: [Number, [Validators.required, Validators.min(1), Validators.max(11)]],
    campo_modalidad: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(50000)]],
    descripcion_comprobante: ['',[Validators.minLength(3), Validators.maxLength(255)]],
    tema_estrategico: this.fb.array([this.temasgroup()],[Validators.required]),
    objetivo_estrategico_desarrollo: this.fb.array([this.objEstrategicasgroup()],[Validators.required]),
    metas: this.fb.array([this.metasgroup()],[Validators.required]),
    acciones_estrategicas: this.fb.array([this.acciones_estrategicasgroup()],[Validators.required]),
    objetivo_estrategico_institucional: this.fb.array([this.objetivo_estrategico_institucionalgroup()],[Validators.required]),
    indicador: this.fb.array([this.indicadorgroup()],[Validators.required]),
    productos: this.fb.array([this.productosgroup()],[Validators.required]),
  })

  ngOnInit(): void {
    this.fBasicInfo.patchValue(this.Usuario);
    this.fBasicInfo.controls['nombre'].disable();
    this.fBasicInfo.controls['apellido'].disable();
    this.fBasicInfo.controls['identificacion'].disable();
    this.fBasicInfo.controls['email'].disable();
  }

  onSubmit(){
    let {nombre, apellido, identificacion, email, ...others} = this.fBasicInfo.value;
    this.fExclusiva = others;
    console.log(this.fExclusiva);
    this.dexclusivaSvc.postDexclusiva(this.fExclusiva).subscribe(); 
  }

  // Temas

  temasgroup() {
    return this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get temasArr() : FormArray {
    return this.fBasicInfo.get('tema_estrategico') as FormArray;
  }
  addInputTemas() {
    this.temasArr.push(this.temasgroup());
  }


  // Objetivos Estrategicos
  objEstrategicasgroup() {
    return this.fb.group({
      objEstrategico: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get objEstrategicosArr() : FormArray {
    return this.fBasicInfo.get('objetivo_estrategico_desarrollo') as FormArray;
  }

  addInputObjEstrategicos() {
    this.objEstrategicosArr.push(this.objEstrategicasgroup());
  }




// Metas

  metasgroup() {
    return this.fb.group({
      meta: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }


  get metasArr() : FormArray {
    return this.fBasicInfo.get('metas') as FormArray;
  }
  addInputMetas() {
    this.metasArr.push(this.metasgroup());
  }

// Acciones Estrategicas
  acciones_estrategicasgroup() {
    return this.fb.group({
      accion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }


  get acciones_estrategicasArr() : FormArray {
    return this.fBasicInfo.get('acciones_estrategicas') as FormArray;
  }
  addInputacciones_estrategicas() {
    this.acciones_estrategicasArr.push(this.acciones_estrategicasgroup());
  }


  // Objetivo Estrategico Institucional
  objetivo_estrategico_institucionalgroup() {
    return this.fb.group({
      objetivo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get objetivo_estrategico_institucionalArr() : FormArray {
    return this.fBasicInfo.get('objetivo_estrategico_institucional') as FormArray;
  }

  objetivo_estrategico_institucional() {
    this.objetivo_estrategico_institucionalArr.push(this.objetivo_estrategico_institucionalgroup());
  }

  // Indicador
  indicadorgroup() {
    return this.fb.group({
      indicador: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get indicadorArr() : FormArray {
    return this.fBasicInfo.get('indicador') as FormArray;
  }

  addInputIndicador() {
    this.indicadorArr.push(this.indicadorgroup());
  }


// Productos

  productosgroup() {
    return this.fb.group({
      producto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get productosArr() : FormArray {
    return this.fBasicInfo.get('productos') as FormArray;
  }

  addInputProductos() {
    this.productosArr.push(this.productosgroup());
  }


// Eliminar del control
  removeInput(controlName: string, index: number) {
    const control = this.fBasicInfo.get(controlName) as FormArray;
    control.removeAt(index);
  }



  
  isInvalidForm(controlName: string) {
    return this.fBasicInfo.get(controlName)?.invalid && this.fBasicInfo.get(controlName)?.touched;
  }
  
}

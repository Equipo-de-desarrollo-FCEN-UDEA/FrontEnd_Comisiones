import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

// --------- SERVICIOS E INTERFACES ---------
import { CumplidosService } from '@services/comisiones/cumplidos.service';
import { LoaderService } from '@services/interceptors/loader.service';



@Component({
  selector: 'app-cumplido',
  templateUrl: './crear-cumplido.component.html',
  styleUrls: ['./crear-cumplido.component.scss']
})
export class CumplidoComponent implements OnInit {

  error='';
  submitted = false;

  getId: string | null;

  // Loadder
  isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  // Archivos 
  files : any[]=[];

  archivos = [1];
  correosArray:any = [];

  cumplidoForm: FormGroup;

  correosPredeterminados: any= [
    { nombre: 'Secretaria del CIEN', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Programa de Extensión', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Fondo de Pasajes Internacionales', value: 'dandrea.torres@udea.edu.co' },
    { nombre: 'Vicerrectoría de Investigación', value: 'david.torresg@udea.edu.co' },
    { nombre: 'Centro de Investigaciones SIU', value: 'david.torresg@udea.edu.co' },
    { nombre: 'Fondos de Vicerrectoría de Docencia', value: 'david.torresg@udea.edu.co' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private activateRoute: ActivatedRoute,

    private cumplidoSvc: CumplidosService,
    private loaderSvc: LoaderService
  ) { 

    this.getId = this.activateRoute.snapshot.paramMap.get('id');


    this.cumplidoForm = this.formBuilder.group({
      observaciones: [''],
      correos:  new FormArray([]),
      otrosDestinatarios: [''],
      comisiones_id: [this.getId]
    })
  }

  ngOnInit(): void {
    
  }


  // ----------------------------------------------
  // --------------- CHECKBOX CORREOS -------------
  // ---------------------------------------------
  onCheckboxChange(event: any) {
    
    const correos = (this.cumplidoForm.controls['correos'] as FormArray);

    if (event.target.checked) {
      correos.push(new FormControl(event.target.value));

    } else {
      const index = correos.controls.findIndex(x => x.value === event.target.value);
      correos.removeAt(index);
    }
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f(){
    return this.cumplidoForm.controls
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
    this.archivos.splice(index, 1);};
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  isInvalidForm(controlName: string) {
    return this.cumplidoForm.get(controlName)?.invalid && this.cumplidoForm.get(controlName)?.touched;
  }

  validTipoArchivo() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }


 // ----------------------------------------
 // ----------- SUBIR CUMPLIDO ------------
 // ----------------------------------------

  subirCumplido(){

    if (this.cumplidoForm.invalid) {
      return;
    }

    const body = {
      observaciones: this.cumplidoForm.value.observaciones,
      correos: this.cumplidoForm.value.correos,
      comisiones_id: this.cumplidoForm.value.comisiones_id,
      otrosDestinatarios : this.cumplidoForm.value.otrosDestinatarios.split(",")
    }

    body.otrosDestinatarios.forEach((correo: any) => body.correos.push(correo));


    const reqBody: FormData = new FormData();
    reqBody.append('observaciones', body.observaciones);
    reqBody.append('correos', body.correos);
    reqBody.append('comisiones_id', body.comisiones_id);

    for (const file of this.files) {
      reqBody.append('archivo', file, file.name) 
    }

    console.log(reqBody.get('correos'));
    console.log(body.correos);


    // Post cumplido
    Swal.fire({
      title: '¿Seguro que quieres enviar el cumplido?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Enviar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cumplidoSvc.postCumplido(reqBody).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home']);
            Swal.fire({
              title: 'Creado!',
              text: '¡El cumplido se creó y envió con éxito!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err.error.msg;
            }
          },
        });
      }
    });


  }

}

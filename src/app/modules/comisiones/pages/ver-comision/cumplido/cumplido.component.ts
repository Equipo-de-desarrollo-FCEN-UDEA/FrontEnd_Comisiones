import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CumplidosService } from '@services/comisiones/cumplidos.service';
import { LoaderService } from '@services/interceptors/loader.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cumplido',
  templateUrl: './cumplido.component.html',
  styleUrls: ['./cumplido.component.scss']
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

  cumplidoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cumplidoSvc: CumplidosService,
    private ngZone: NgZone,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private loaderSvc: LoaderService
  ) { 

    this.getId = this.activateRoute.snapshot.paramMap.get('id');

    this.cumplidoForm = this.formBuilder.group({
      observations: [''],
      emails: [''],
      comisiones_id: [this.getId]
    })
  }

  ngOnInit(): void {
  }

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


 // ----------------------------------------
 // ----------- SUBIR CUMPLIDO ------------
 // ----------------------------------------

  subirCumplido(){

    if (this.cumplidoForm.invalid) {
      return;
    }


    const body = {
      observations: this.cumplidoForm.value.observations,
      emails: this.cumplidoForm.value.emails,
      comisiones_id: this.cumplidoForm.value.comisiones_id
    }

    const reqBody: FormData = new FormData();
    reqBody.append('observations', body.observations);
    reqBody.append('emails', body.emails);
    reqBody.append('comisiones_id', body.comisiones_id);

    for (const file of this.files) {
      reqBody.append('archivo', file, file.name) 
    }

    console.log(reqBody.get('archivo'));


    this.cumplidoSvc.subirCumplido(reqBody).subscribe({
      next: (res) => { 
        Swal.fire({
          title: 'Creado',
          text: '¡El cumplido se creó con éxito!',
          icon: 'success',
          confirmButtonColor: '#3AB795',
        });
        //ngZone: facilitate change detection
        this.ngZone.run(() =>
          this.router.navigateByUrl(`/home`)
        );
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      }
    });


  }

}

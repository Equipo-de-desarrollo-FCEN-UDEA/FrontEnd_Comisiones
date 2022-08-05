import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Countries, countries } from '@data/country-data-store';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ComisionesService } from '@services/comisiones.service';
import { LoaderService } from '@services/loader.service';
import { Subject } from 'rxjs';
import { DiasHabiles } from '@shared/clases/dias-habiles';
import { PaisesCiudadesService } from '@services/paises-ciudades.service';
import { Ciudad, Pais, Estado } from '@interfaces/paises-ciudades';

@Component({
  selector: 'app-crear-comision',
  templateUrl: './crear-comision.component.html',
  styleUrls: ['./crear-comision.component.scss'],
})
export class CrearComisionComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  public countries: Countries[] = countries;

  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  public dias_permiso = 15;
  today = this.calendar.getToday();
  files: any[] = [];
  archivos = [1];
  clicked = 0;
  private pais : Pais={
    id: 0,
    name: '',
    iso2: ''
  };
  private estado : Estado = {
    id: 0,
    name: '',
    iso2: '',
  }
  @ViewChild('floatingpais') floatingpais: ElementRef | null = null;
  public paises: Pais[]=[];
  public ciudades: Ciudad[]=[];
  public estados: Estado[]=[];
  public tiposcomision = [
    { id: 1, nombre: 'Comisión de servicios' },
    { id: 2, nombre: 'Comisión de estudio' },
  ];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private comisionesSvc: ComisionesService,
    private loaderService: LoaderService,
    private paisesCiudadesSvc: PaisesCiudadesService
  ) {
    this.fromDate = null;
    this.toDate = null;

  }

  inRange(fecha_1: any, fecha_2: any) {
    fecha_1 = new Date(this.formatter.format(fecha_1));
    fecha_2 = new Date(this.formatter.format(fecha_2));
    console.log('paso');
    console.log(fecha_1);
    console.log(DiasHabiles(fecha_1, fecha_2), fecha_1, fecha_2);
    return DiasHabiles(fecha_1, fecha_2) > this.dias_permiso;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.formComision.patchValue({
      fecha_inicio: this.formatter.format(this.fromDate),
      fecha_fin: this.formatter.format(this.toDate),
    });
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  formComision = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    justificacion: [
      '',
      [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(350),
      ],
    ],
    idioma: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    lugar: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    tipos_comision_id: [
      0,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(this.tiposcomision.length),
      ],
    ],
  });

  // ngOnInit(): void {}
  // onUpload(event: Event, index: number) {
  //   fecha_inicio : ['', [Validators.required]],
  //   fecha_fin : ['',[Validators.required]],
  //   justificacion : ['', [Validators.required,Validators.minLength(30),Validators.maxLength(350)]],
  //   idioma : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
  //   pais : ['',[Validators.required]],
  //   estado: ['',[Validators.required]],
  //   ciudad : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
  //   tipos_comision_id : [0,[Validators.required,Validators.min(1),Validators.max(this.tiposcomision.length)]]});

  ngOnInit(): void {
     this.paisesCiudadesSvc.getPaises().subscribe(
      (data:Pais[]) => {
        this.paises = data;
      }
     )
  }
  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
    console.log(this.files);
  }

  onChangePais(event:any) {
    const paisId = event.target.value;
    this.pais = this.paises[paisId];
    this.paisesCiudadesSvc.getEstados(this.pais).subscribe(
      (data:Estado[]) => {
        this.estados = data;
      }
    )
  }

  onChangeEstado(event:any) {
    const estadoId = event.target.value;
    this.estado = this.estados[estadoId];
    this.paisesCiudadesSvc.getCiudades(this.pais, this.estado).subscribe(
      (data:Ciudad[]) => {
        this.ciudades = data;
      }
    );
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
    }
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  isInvalidForm(controlName: string) {
    return (
      this.formComision.get(controlName)?.invalid &&
      this.formComision.get(controlName)?.touched
    );
  }

  // onSubmit() {
  //   const response = {
  //     ...this.formComision.value,
  //     archivos: this.files,
  //     usuarios_id: 12,
  //   };
  //   console.log(response);
  //   this.comisionesSvc.crearComision(response).subscribe((data: any) => {
  //     window.alert(data.msg);
  //   });

  //     fecha_resolucion: new Date(this.formatter.format(this.today)),
  //     usuarios_id: 12,
  //     pais: this.pais.name,
  //     estado: this.estado.name,
  //   }
  //   console.log(response)
  //   this.comisionesSvc.crearComision(response).subscribe(
  //     (data:any) => {
  //       window.alert(data.message)
  //     }
  //   )

  // onSubmit() {
  //   const response = {
  //     ...this.formComision.value,
  //     archivos: this.files,
  //     usuarios_id: 12,
  //   };
  //   console.log(response);
  //   this.comisionesSvc.crearComision(response).subscribe((data: any) => {
  //     window.alert(data.msg);
  //   });
  //     fecha_resolucion: new Date(this.formatter.format(this.today)),
  //     usuarios_id: 12,
  //     pais: this.pais.name,
  //     estado: this.estado.name,
  //   }
  //   console.log(response)
  //   this.comisionesSvc.crearComision(response).subscribe(
  //     (data:any) => {
  //       window.alert(data.message)
  //     }
  //   )
  }



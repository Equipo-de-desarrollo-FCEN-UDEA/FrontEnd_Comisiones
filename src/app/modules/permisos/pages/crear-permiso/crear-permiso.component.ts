import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Countries, countries } from '@data/country-data-store';


@Component({
  selector: 'app-crear-permiso',
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.scss']
})
export class CrearPermisoComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  public countries: Countries[] = countries
  fromDate: NgbDate | null;
  toDate: NgbDate | null = null;
  model: NgbDateStruct | null = null;
  today = this.calendar.getToday();
  files : any[]=[];
  archivos = [1];
  clicked = 0

  public tipospermiso = [
    {id: 1, nombre: 'Permiso por matrimonio'},
    {id: 2, nombre: 'Permiso corto'},
    {id: 3, nombre: 'Permiso de medio dia de la jornada por cumpleaños'},
    {id: 4, nombre: 'Licencia de maternidad'},
    {id: 5, nombre: 'Licencia de patermidad'},
    {id: 6, nombre: 'Licencia de calamiad domestica'},
    {id: 7, nombre: 'Licencia no remunerada'},
    {id: 8, nombre: 'Licencia de luto'}
  ]

  constructor(
    private fb: FormBuilder,
    private calendar : NgbCalendar,
    public formatter: NgbDateParserFormatter,
    // private comisionesSvc: ComisionesService

  ) {
    this.fromDate = null;
    this.toDate = null;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.formPermiso.patchValue({
      fecha_inicio : this.formatter.format(this.fromDate),
      fecha_fin : this.formatter.format(this.toDate)
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  formPermiso = this.fb.group({
    fecha_inicio : ['', [Validators.required]],
    fecha_fin : ['',[Validators.required]],
    justificacion : ['', [Validators.required,Validators.minLength(30),Validators.maxLength(350)]],
    // idioma : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    // lugar : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
    tipos_permiso_id : [0,[Validators.required,Validators.min(1),Validators.max(this.tipospermiso.length)]]});


  ngOnInit(): void {
  }
  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
    console.log(this.files)

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
    return this.formPermiso.get(controlName)?.invalid && this.formPermiso.get(controlName)?.touched;
  }

  // onSubmit() {
  //   const response ={
  //     ...this.formPermiso.value,
  //     archivos: this.files,
  //     usuarios_id: 12
  //   }
  //   console.log(response)
  //   this.comisionesSvc.crearComision(response).subscribe(
  //     (data:any) => {
  //       window.alert(data.msg)
  //     }
  //   )
  // }

}

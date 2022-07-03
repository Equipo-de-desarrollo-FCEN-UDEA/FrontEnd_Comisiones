import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-carta-inicio',
  templateUrl: './carta-inicio.component.html',
  styleUrls: ['./carta-inicio.component.css']
})
export class CartaInicioComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
    
   }
   FormCarta = this.fb.group({
    Cuerpo: ['', Validators.required],
   }
   );

  ngOnInit(): void {
  }

  
  OnSubmit() {
    console.log(this.FormCarta.value);
  }

}
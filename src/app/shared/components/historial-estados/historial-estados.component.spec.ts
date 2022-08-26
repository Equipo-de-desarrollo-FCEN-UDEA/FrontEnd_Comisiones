import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstadosComponent } from './historial-estados.component';

describe('HistorialEstadosComponent', () => {
  let component: HistorialEstadosComponent;
  let fixture: ComponentFixture<HistorialEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialEstadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

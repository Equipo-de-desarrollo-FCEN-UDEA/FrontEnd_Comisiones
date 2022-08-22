import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPermisoComponent } from './buscar-permiso.component';

describe('BuscarPermisoComponent', () => {
  let component: BuscarPermisoComponent;
  let fixture: ComponentFixture<BuscarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

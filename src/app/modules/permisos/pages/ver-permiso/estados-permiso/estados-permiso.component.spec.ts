import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosPermisoComponent } from './estados-permiso.component';

describe('EstadosPermisoComponent', () => {
  let component: EstadosPermisoComponent;
  let fixture: ComponentFixture<EstadosPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

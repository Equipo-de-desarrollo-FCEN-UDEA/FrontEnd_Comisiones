import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosComisionComponent } from './estados-comision.component';

describe('EstadosComisionComponent', () => {
  let component: EstadosComisionComponent;
  let fixture: ComponentFixture<EstadosComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

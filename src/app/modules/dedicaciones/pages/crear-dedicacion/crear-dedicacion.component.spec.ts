import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDedicacionComponent } from './crear-dedicacion.component';

describe('CrearDedicacionComponent', () => {
  let component: CrearDedicacionComponent;
  let fixture: ComponentFixture<CrearDedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDedicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

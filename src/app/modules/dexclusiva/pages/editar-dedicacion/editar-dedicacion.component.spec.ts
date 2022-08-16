import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDedicacionComponent } from './editar-dedicacion.component';

describe('EditarDedicacionComponent', () => {
  let component: EditarDedicacionComponent;
  let fixture: ComponentFixture<EditarDedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDedicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

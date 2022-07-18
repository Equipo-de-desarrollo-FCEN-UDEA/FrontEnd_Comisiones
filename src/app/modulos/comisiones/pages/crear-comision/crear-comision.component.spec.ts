import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComisionComponent } from './crear-comision.component';

describe('CrearComisionComponent', () => {
  let component: CrearComisionComponent;
  let fixture: ComponentFixture<CrearComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

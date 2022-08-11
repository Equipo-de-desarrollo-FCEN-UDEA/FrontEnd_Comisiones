import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarComisionComponent } from './buscar-comision.component';

describe('BuscarComisionComponent', () => {
  let component: BuscarComisionComponent;
  let fixture: ComponentFixture<BuscarComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

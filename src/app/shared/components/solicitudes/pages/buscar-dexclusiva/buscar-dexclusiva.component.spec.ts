import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDexclusivaComponent } from './buscar-dexclusiva.component';

describe('BuscarDexclusivaComponent', () => {
  let component: BuscarDexclusivaComponent;
  let fixture: ComponentFixture<BuscarDexclusivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarDexclusivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarDexclusivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

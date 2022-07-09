import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComisionesComponent } from './tabla-comisiones.component';

describe('TablaComisionesComponent', () => {
  let component: TablaComisionesComponent;
  let fixture: ComponentFixture<TablaComisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaComisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPermisoComponent } from './ver-permiso.component';

describe('VerPermisoComponent', () => {
  let component: VerPermisoComponent;
  let fixture: ComponentFixture<VerPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

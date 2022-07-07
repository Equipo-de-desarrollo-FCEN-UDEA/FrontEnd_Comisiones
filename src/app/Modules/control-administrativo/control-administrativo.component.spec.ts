import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAdministrativoComponent } from './control-administrativo.component';

describe('ControlAdministrativoComponent', () => {
  let component: ControlAdministrativoComponent;
  let fixture: ComponentFixture<ControlAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

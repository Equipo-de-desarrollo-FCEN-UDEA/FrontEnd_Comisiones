import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDedicacionComponent } from './ver-dedicacion.component';

describe('VerDedicacionComponent', () => {
  let component: VerDedicacionComponent;
  let fixture: ComponentFixture<VerDedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDedicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

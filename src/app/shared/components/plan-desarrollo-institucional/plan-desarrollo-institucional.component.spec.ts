import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDesarrolloInstitucionalComponent } from './plan-desarrollo-institucional.component';

describe('PlanDesarrolloInstitucionalComponent', () => {
  let component: PlanDesarrolloInstitucionalComponent;
  let fixture: ComponentFixture<PlanDesarrolloInstitucionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDesarrolloInstitucionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDesarrolloInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

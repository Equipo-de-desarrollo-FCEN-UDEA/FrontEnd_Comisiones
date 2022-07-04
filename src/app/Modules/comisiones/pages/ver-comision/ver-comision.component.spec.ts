import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComisionComponent } from './ver-comision.component';

describe('VerComisionComponent', () => {
  let component: VerComisionComponent;
  let fixture: ComponentFixture<VerComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

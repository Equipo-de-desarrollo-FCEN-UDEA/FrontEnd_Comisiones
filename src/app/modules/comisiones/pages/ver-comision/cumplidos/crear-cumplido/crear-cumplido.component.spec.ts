import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumplidoComponent } from './crear-cumplido.component';

describe('CumplidoComponent', () => {
  let component: CumplidoComponent;
  let fixture: ComponentFixture<CumplidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumplidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumplidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

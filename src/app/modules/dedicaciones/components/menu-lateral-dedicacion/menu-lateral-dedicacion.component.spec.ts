import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralDedicacionComponent } from './menu-lateral-dedicacion.component';

describe('MenuLateralDedicacionComponent', () => {
  let component: MenuLateralDedicacionComponent;
  let fixture: ComponentFixture<MenuLateralDedicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralDedicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralDedicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

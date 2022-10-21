import { TestBed } from '@angular/core/testing';

import { PlanDesarrolloService } from './plan-desarrollo.service';

describe('PlanDesarrolloService', () => {
  let service: PlanDesarrolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDesarrolloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DedicacionService } from './dedicacion.service';

describe('DexclusivaService', () => {
  let service: DedicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DedicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

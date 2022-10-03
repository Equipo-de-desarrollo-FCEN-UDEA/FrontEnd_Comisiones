import { TestBed } from '@angular/core/testing';

import { DedicacionxestadoService } from './dedicacionxestado.service';

describe('DedicacionxestadoService', () => {
  let service: DedicacionxestadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DedicacionxestadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

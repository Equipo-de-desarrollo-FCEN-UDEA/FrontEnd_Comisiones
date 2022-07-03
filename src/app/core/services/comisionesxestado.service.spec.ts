import { TestBed } from '@angular/core/testing';

import { ComisionesxestadoService } from './comisionesxestado.service';

describe('ComisionesxestadoService', () => {
  let service: ComisionesxestadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComisionesxestadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

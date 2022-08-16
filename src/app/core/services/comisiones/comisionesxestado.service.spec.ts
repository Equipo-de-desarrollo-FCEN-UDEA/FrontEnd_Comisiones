import { TestBed } from '@angular/core/testing';

import { ComisionxestadoService } from './comisionesxestado.service';

describe('ComisionesxestadoService', () => {
  let service: ComisionxestadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComisionxestadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

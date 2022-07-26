import { TestBed } from '@angular/core/testing';

import { BuscarPermisosService } from './buscar-permisos.service';

describe('BuscarPermisosService', () => {
  let service: BuscarPermisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarPermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

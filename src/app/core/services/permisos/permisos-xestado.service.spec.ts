import { TestBed } from '@angular/core/testing';

import { PermisosXEstadoService } from './permisos-xestado.service';

describe('PermisosXEstadoService', () => {
  let service: PermisosXEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosXEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

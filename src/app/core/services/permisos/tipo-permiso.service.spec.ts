import { TestBed } from '@angular/core/testing';

import { TipoPermisoService } from './tipo-permiso.service';

describe('TipoPermisoService', () => {
  let service: TipoPermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

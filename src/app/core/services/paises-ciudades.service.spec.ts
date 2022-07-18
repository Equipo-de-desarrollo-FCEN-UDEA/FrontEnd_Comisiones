import { TestBed } from '@angular/core/testing';

import { PaisesCiudadesService } from './paises-ciudades.service';

describe('PaisesCiudadesService', () => {
  let service: PaisesCiudadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisesCiudadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

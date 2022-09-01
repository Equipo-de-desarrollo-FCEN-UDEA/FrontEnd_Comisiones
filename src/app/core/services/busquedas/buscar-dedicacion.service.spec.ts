import { TestBed } from '@angular/core/testing';

import { BuscarDedicacionService } from './buscar-dedicacion.service';

describe('BuscarDedicacionService', () => {
  let service: BuscarDedicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarDedicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

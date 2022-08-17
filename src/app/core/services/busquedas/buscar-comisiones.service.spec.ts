import { TestBed } from '@angular/core/testing';

import { BuscarComisionesService } from './buscar-comisiones.service';

describe('BuscarComisionesService', () => {
  let service: BuscarComisionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarComisionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

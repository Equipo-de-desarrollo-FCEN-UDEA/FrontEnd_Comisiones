import { TestBed } from '@angular/core/testing';

import { CartaInicioService } from './carta-inicio.service';

describe('CartaInicioService', () => {
  let service: CartaInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

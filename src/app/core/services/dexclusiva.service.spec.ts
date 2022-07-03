import { TestBed } from '@angular/core/testing';

import { DexclusivaService } from './dexclusiva.service';

describe('DexclusivaService', () => {
  let service: DexclusivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexclusivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

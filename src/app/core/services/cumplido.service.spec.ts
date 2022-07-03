import { TestBed } from '@angular/core/testing';

import { CumplidoService } from './cumplido.service';

describe('CumplidoService', () => {
  let service: CumplidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumplidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

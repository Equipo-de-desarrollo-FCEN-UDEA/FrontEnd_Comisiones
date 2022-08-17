import { TestBed } from '@angular/core/testing';

import { CumplidosService } from './cumplidos.service';

describe('CumplidosService', () => {
  let service: CumplidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumplidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FormatoViceService } from './formato-vice.service';

describe('FormatoViceService', () => {
  let service: FormatoViceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatoViceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

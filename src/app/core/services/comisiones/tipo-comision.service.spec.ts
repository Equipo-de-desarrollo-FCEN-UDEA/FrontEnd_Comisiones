import { TestBed } from '@angular/core/testing';

import { TipoComisionService } from './tipo-comision.service';

describe('TipoComisionService', () => {
  let service: TipoComisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoComisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

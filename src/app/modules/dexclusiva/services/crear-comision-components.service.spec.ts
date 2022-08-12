import { TestBed } from '@angular/core/testing';

import { CrearComisionComponentsService } from './crear-comision-components.service';

describe('CrearComisionComponentsService', () => {
  let service: CrearComisionComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearComisionComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

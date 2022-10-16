import { TestBed } from '@angular/core/testing';

import { CrearDedicacionComponentsService } from './crear-dedicacion-components.service';

describe('CrearDedicacionComponentsService', () => {
  let service: CrearDedicacionComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearDedicacionComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

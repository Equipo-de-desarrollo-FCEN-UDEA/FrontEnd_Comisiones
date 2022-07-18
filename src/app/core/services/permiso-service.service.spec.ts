import { TestBed } from '@angular/core/testing';

import { PermisoServiceService } from './permiso-service.service';

describe('PermisoServiceService', () => {
  let service: PermisoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TablaComisionesService } from './tabla-comisiones.service';

describe('TablaComisionesService', () => {
  let service: TablaComisionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaComisionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DescargarDocumentosService } from './descargar-documentos.service';

describe('DescargarDocumentosService', () => {
  let service: DescargarDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargarDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

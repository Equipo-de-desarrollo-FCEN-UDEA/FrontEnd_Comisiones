import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { DexclusivaService } from './dexclusiva.service';

describe('DexclusivaService', () => {
  let service: DexclusivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexclusivaService);
=======
import { DedicacionService } from './dedicacion.service';

describe('DexclusivaService', () => {
  let service: DedicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DedicacionService);
>>>>>>> main
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RoladminGuard } from './roladmin.guard';

describe('RoladminGuard', () => {
  let guard: RoladminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoladminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

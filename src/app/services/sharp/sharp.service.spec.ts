import { TestBed } from '@angular/core/testing';

import { SharpService } from './sharp.service';

describe('SharpService', () => {
  let service: SharpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

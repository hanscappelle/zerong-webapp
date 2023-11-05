import { TestBed } from '@angular/core/testing';

import { MongolService } from './mongol.service';

describe('MongolService', () => {
  let service: MongolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

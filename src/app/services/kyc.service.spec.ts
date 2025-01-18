import { TestBed } from '@angular/core/testing';

import { KycService } from './kyc.service';

describe('KycService', () => {
  let service: KycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

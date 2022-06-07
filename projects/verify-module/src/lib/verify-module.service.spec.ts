import { TestBed } from '@angular/core/testing';

import { VerifyModuleService } from './verify-module.service';

describe('VerifyModuleService', () => {
  let service: VerifyModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VerifyLibraryService } from './verify-module.service';

describe('VerifyModuleService', () => {
  let service: VerifyLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

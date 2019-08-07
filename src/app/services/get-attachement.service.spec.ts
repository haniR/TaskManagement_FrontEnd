import { TestBed } from '@angular/core/testing';

import { GetAttachementService } from './get-attachement.service';

describe('GetAttachementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAttachementService = TestBed.get(GetAttachementService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetListsService } from './get-lists.service';

describe('GetListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetListsService = TestBed.get(GetListsService);
    expect(service).toBeTruthy();
  });
});

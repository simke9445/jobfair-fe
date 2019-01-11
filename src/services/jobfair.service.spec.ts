import { TestBed } from '@angular/core/testing';

import { JobfairService } from './jobfair.service';

describe('JobfairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobfairService = TestBed.get(JobfairService);
    expect(service).toBeTruthy();
  });
});

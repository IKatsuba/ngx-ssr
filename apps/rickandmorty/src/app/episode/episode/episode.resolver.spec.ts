import { TestBed } from '@angular/core/testing';

import { EpisodeResolver } from './episode.resolver';

describe('EpisodeService', () => {
  let service: EpisodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

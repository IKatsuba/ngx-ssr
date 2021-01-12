import { TestBed } from '@angular/core/testing';

import { CharacterResolver } from './character.resolver';

describe('CharacterService', () => {
  let service: CharacterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

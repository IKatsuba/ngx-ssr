import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BASE_URL } from './tokens';
import { Location } from '@angular/common';

describe('RamApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
    baseUrl = TestBed.inject(BASE_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an one character', async () => {
    const response = service.getCharacter(1).toPromise();

    const req = httpController.expectOne(
      Location.joinWithSlash(baseUrl, 'character/1')
    );

    req.flush({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
        // ...
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    });

    expect(await response).toEqual([
      {
        created: expect.any(Date),
        episode: [1, 2],
        gender: 'Male',
        id: 1,
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        location: {
          id: 20,
          name: 'Earth',
        },
        name: 'Rick Sanchez',
        origin: {
          id: 1,
          name: 'Earth',
        },
        species: 'Human',
        status: 'Alive',
        type: '',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
    ]);
  });

  it('should return many characters', async () => {
    const response = service.getCharacter([1, 2]).toPromise();

    const req = httpController.expectOne(
      Location.joinWithSlash(baseUrl, 'character/1,2')
    );

    req.flush([
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
          // ...
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
      {
        id: 183,
        name: 'Johnny Depp',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-500A)',
          url: 'https://rickandmortyapi.com/api/location/23',
        },
        location: {
          name: 'Earth (C-500A)',
          url: 'https://rickandmortyapi.com/api/location/23',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/183.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/8'],
        url: 'https://rickandmortyapi.com/api/character/183',
        created: '2017-12-29T18:51:29.693Z',
      },
    ]);

    expect(await response).toEqual([
      {
        created: expect.any(Date),
        episode: [1, 2],
        gender: 'Male',
        id: 1,
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        location: {
          id: 20,
          name: 'Earth (Replacement Dimension)',
        },
        name: 'Rick Sanchez',
        origin: {
          id: 1,
          name: 'Earth (C-137)',
        },
        species: 'Human',
        status: 'Alive',
        type: '',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
      {
        created: expect.any(Date),
        episode: [8],
        gender: 'Male',
        id: 183,
        image: 'https://rickandmortyapi.com/api/character/avatar/183.jpeg',
        location: {
          id: 23,
          name: 'Earth (C-500A)',
        },
        name: 'Johnny Depp',
        origin: {
          id: 23,
          name: 'Earth (C-500A)',
        },
        species: 'Human',
        status: 'Alive',
        type: '',
        url: 'https://rickandmortyapi.com/api/character/183',
      },
    ]);
  });

  it('should return a response with pagination', async () => {
    const response = service.getCharacter().toPromise();

    const req = httpController.expectOne(
      Location.joinWithSlash(baseUrl, 'character')
    );

    req.flush({
      info: {
        count: 591,
        pages: 20,
        next: 'https://rickandmortyapi.com/api/character/?page=2',
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            // ...
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    });

    expect(await response).toEqual({
      info: {
        count: 591,
        next: {
          page: '2',
        },
        pages: 20,
        prev: null,
      },
      results: [
        {
          created: expect.any(Date),
          episode: [1, 2],
          gender: 'Male',
          id: 1,
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          location: {
            id: 20,
            name: 'Earth',
          },
          name: 'Rick Sanchez',
          origin: {
            id: 1,
            name: 'Earth',
          },
          species: 'Human',
          status: 'Alive',
          type: '',
          url: 'https://rickandmortyapi.com/api/character/1',
        },
      ],
    });
  });

  afterEach(() => {
    httpController.verify();
  });
});

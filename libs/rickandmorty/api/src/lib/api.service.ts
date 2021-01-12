import { inject, Injectable } from '@angular/core';
import { BASE_URL } from './tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Location as NgLocation } from '@angular/common';
import { PingResponse } from './interfaces/ping';
import { RawResponse } from './interfaces/raw-response';
import { EpisodeFilter } from './interfaces/episode-filter';
import { RawEpisode } from './interfaces/raw-episode';
import { LocationFilter } from './interfaces/location-filter';
import { RawLocation } from './interfaces/raw-location';
import { Location } from './interfaces/location';
import { CharacterFilter } from './interfaces/character-filter';
import { RawCharacter } from './interfaces/raw-character';
import { Episode } from './interfaces/episode';
import { catchError, map } from 'rxjs/operators';
import { responseFactory } from './helpers/response-factory';
import { Response } from './interfaces/response';
import { Character } from './interfaces/character';
import { coerceArray } from './helpers/coerce-array';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = inject(BASE_URL);
  private http = inject(HttpClient);

  ping(): Observable<PingResponse> {
    return this.http.get<PingResponse>(this.baseUrl);
  }

  getEpisode(): Observable<Response<Episode, EpisodeFilter>>;
  getEpisode(id: number | number[]): Observable<Episode[]>;
  getEpisode(
    filter: LocationFilter
  ): Observable<Response<Episode, EpisodeFilter>>;
  getEpisode(
    id?: number | number[] | EpisodeFilter
  ): Observable<Episode[] | Response<Episode, EpisodeFilter>> {
    return this.getEntity<RawEpisode>('episode', id).pipe(
      map((rawResponse) => responseFactory(rawResponse, Episode.fromJson))
    );
  }

  getLocation(): Observable<Response<Location, LocationFilter>>;
  getLocation(id: number | number[]): Observable<Location[]>;
  getLocation(
    filter: LocationFilter
  ): Observable<Response<Location, LocationFilter>>;
  getLocation(
    id?: number | number[] | CharacterFilter
  ): Observable<Location[] | Response<Location, LocationFilter>> {
    return this.getEntity<RawLocation>('location', id).pipe(
      map((rawResponse) => responseFactory(rawResponse, Location.fromJson))
    );
  }

  getCharacter(): Observable<Response<Character, CharacterFilter>>;
  getCharacter(id: number | number[]): Observable<Character[]>;
  getCharacter(
    filter: CharacterFilter
  ): Observable<Response<Character, CharacterFilter>>;
  getCharacter(
    id?: number | number[] | CharacterFilter
  ): Observable<Character[] | Response<Character, CharacterFilter>> {
    return this.getEntity<RawCharacter>('character', id).pipe(
      map((rawResponse) => responseFactory(rawResponse, Character.fromJson))
    );
  }

  private getEntity<T>(
    url: string,
    id?: number | number[] | Partial<T>
  ): Observable<T[] | RawResponse<T>> {
    const [ids, params] = [
      this.isId(id)
        ? coerceArray(id).filter((i) => (i ?? false) !== false)
        : null,
      this.isId(id) ? null : id,
    ] as [number[], Partial<T>];

    return this.http
      .get<T[] | RawResponse<T>>(
        NgLocation.joinWithSlash(
          NgLocation.joinWithSlash(this.baseUrl, url),
          ids?.join(',') ?? ''
        ),
        { params: new HttpParams({ fromObject: params as any }) }
      )
      .pipe(
        catchError(() => {
          if (typeof id === 'number' || Array.isArray(id)) {
            return of([]);
          }

          return of({
            info: { pages: 0, count: 0, prev: null, next: null },
            results: [],
          });
        })
      );
  }

  private isId(id: number | number[] | any) {
    return typeof id === 'number' || Array.isArray(id);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
  ApiService,
  Character,
  CharacterFilter,
  Response,
} from 'ngx-rickandmorty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterListResolver
  implements Resolve<Response<Character, CharacterFilter>> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Response<Character, CharacterFilter>> {
    return this.api.getCharacter(route.queryParams);
  }
}

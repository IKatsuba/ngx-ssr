import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService, Episode } from 'ngx-rickandmorty';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExtendedCharacter } from '@ngx-ssr/rickandmorty/utils';

@Injectable({
  providedIn: 'root',
})
export class CharacterResolver implements Resolve<ExtendedCharacter> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ExtendedCharacter> {
    return this.api.getCharacter(parseInt(route.paramMap.get('id'), 10)).pipe(
      switchMap(([character]) =>
        this.api.getEpisode(character.episode).pipe(
          map((episode: Episode[]) => ({
            ...character,
            episode,
          }))
        )
      )
    );
  }
}

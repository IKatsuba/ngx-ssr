import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService } from 'ngx-rickandmorty';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExtendedEpisode } from '@ngx-ssr/rickandmorty/utils';

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolver implements Resolve<ExtendedEpisode> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ExtendedEpisode> | Promise<ExtendedEpisode> | ExtendedEpisode {
    return this.apiService
      .getEpisode(parseInt(route.paramMap.get('id'), 10))
      .pipe(
        switchMap(([episode]) =>
          this.apiService
            .getCharacter(episode.characters)
            .pipe(map((characters) => ({ ...episode, characters })))
        )
      );
  }
}

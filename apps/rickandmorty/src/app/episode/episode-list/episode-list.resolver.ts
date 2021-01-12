import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService, Episode, EpisodeFilter, Response } from 'ngx-rickandmorty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeListResolver
  implements Resolve<Response<Episode, EpisodeFilter>> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Response<Episode, EpisodeFilter>> {
    return this.api.getEpisode(route.queryParams);
  }
}

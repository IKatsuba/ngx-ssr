import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'ngx-rickandmorty';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ExtendedEpisode } from '@ngx-ssr/rickandmorty/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ram-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent {
  episode$: Observable<ExtendedEpisode>;

  constructor(apiService: ApiService, route: ActivatedRoute, title: Title) {
    this.episode$ = route.data.pipe(
      map((data) => data.episode),
      tap((episode) => {
        title.setTitle(`${episode.name} | Episodes | Rick and Morty`);
      })
    );
  }
}

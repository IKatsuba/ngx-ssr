import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode, EpisodeFilter, Response } from 'ngx-rickandmorty';
import { FormGroup } from '@angular/forms';
import { FilterService } from '@ngx-ssr/rickandmorty/utils';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'ram-episode',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
  providers: [TuiDestroyService, FilterService],
})
export class EpisodeListComponent {
  readonly episodeResponse$: Observable<Response<Episode, EpisodeFilter>>;
  readonly form: FormGroup;

  constructor(
    private filter: FilterService,
    private route: ActivatedRoute,
    title: Title
  ) {
    title.setTitle('Episodes | Rick and Morty');

    this.form = filter.createForm({
      name: [null],
      episode: [null],
    });

    this.episodeResponse$ = route.data.pipe(
      map((data) => data.episodeResponse)
    );
  }
}

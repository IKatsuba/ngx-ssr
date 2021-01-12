import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeComponent } from './episode/episode.component';
import { EpisodeListResolver } from './episode-list/episode-list.resolver';
import { EpisodeResolver } from './episode/episode.resolver';

const routes: Routes = [
  {
    path: '',
    component: EpisodeListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { episodeResponse: EpisodeListResolver },
  },
  {
    path: ':id',
    component: EpisodeComponent,
    resolve: { episode: EpisodeResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodeRoutingModule {}

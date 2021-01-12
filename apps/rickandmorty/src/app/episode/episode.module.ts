import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodeRoutingModule } from './episode-routing.module';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeComponent } from './episode/episode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLinkModule,
} from '@taiga-ui/core';

@NgModule({
  declarations: [EpisodeListComponent, EpisodeComponent],
  imports: [
    CommonModule,
    EpisodeRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiLinkModule,
  ],
})
export class EpisodeModule {}

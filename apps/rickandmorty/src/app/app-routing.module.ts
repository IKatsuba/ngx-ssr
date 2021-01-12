import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'episode',
    loadChildren: () =>
      import('./episode/episode.module').then((m) => m.EpisodeModule),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule),
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./character/character.module').then((m) => m.CharacterModule),
  },
  {
    path: '**',
    redirectTo: 'character',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

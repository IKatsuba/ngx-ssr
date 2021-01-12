import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './character/character.component';
import { CharacterResolver } from './character/character.resolver';
import { CharacterListResolver } from './character-list/character-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { characterResponse: CharacterListResolver },
  },
  {
    path: ':id',
    component: CharacterComponent,
    resolve: { character: CharacterResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule {}

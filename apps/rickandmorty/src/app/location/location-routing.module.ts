import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationComponent } from './location/location.component';
import { LocationResolver } from './location/location.resolver';
import { LocationListResolver } from './location-list/location-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: LocationListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { locationResponse: LocationListResolver },
  },
  {
    path: ':id',
    component: LocationComponent,
    resolve: { location: LocationResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}

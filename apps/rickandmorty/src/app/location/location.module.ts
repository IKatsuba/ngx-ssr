import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationComponent } from './location/location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLinkModule,
} from '@taiga-ui/core';

@NgModule({
  declarations: [LocationListComponent, LocationComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiLinkModule,
  ],
})
export class LocationModule {}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Location, LocationFilter, Response } from 'ngx-rickandmorty';
import { FilterService } from '@ngx-ssr/rickandmorty/utils';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'ram-location',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  providers: [TuiDestroyService, FilterService],
})
export class LocationListComponent {
  readonly locationResponse$: Observable<Response<Location, LocationFilter>>;
  readonly form: FormGroup;

  constructor(filter: FilterService, route: ActivatedRoute, title: Title) {
    title.setTitle('Locations | Rick and Morty');

    this.form = filter.createForm({
      name: [null],
      type: [null],
      dimension: [null],
    });

    this.locationResponse$ = route.data.pipe(
      map((data) => data.locationResponse)
    );
  }
}

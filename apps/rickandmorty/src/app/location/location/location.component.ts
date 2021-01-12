import { Component } from '@angular/core';
import { ApiService } from 'ngx-rickandmorty';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExtendedLocation } from '@ngx-ssr/rickandmorty/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ram-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  location$: Observable<ExtendedLocation>;

  constructor(apiService: ApiService, route: ActivatedRoute, title: Title) {
    this.location$ = route.data.pipe(
      map((data) => data.location),
      tap((location) => {
        title.setTitle(`${location.name} | Locations | Rick and Morty`);
      })
    );
  }
}

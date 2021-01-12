import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService } from 'ngx-rickandmorty';
import { ExtendedLocation } from '@ngx-ssr/rickandmorty/utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<ExtendedLocation> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ExtendedLocation> {
    return this.apiService
      .getLocation(parseInt(route.paramMap.get('id'), 10))
      .pipe(
        switchMap(([location]) =>
          this.apiService
            .getCharacter(location.residents)
            .pipe(map((residents) => ({ ...location, residents })))
        )
      );
  }
}

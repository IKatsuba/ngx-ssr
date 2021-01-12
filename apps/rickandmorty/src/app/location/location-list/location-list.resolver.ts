import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
  ApiService,
  Location,
  LocationFilter,
  Response,
} from 'ngx-rickandmorty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationListResolver
  implements Resolve<Response<Location, LocationFilter>> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Response<Location, LocationFilter>> {
    return this.api.getLocation(route.queryParams);
  }
}

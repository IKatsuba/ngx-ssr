import { Component } from '@angular/core';
import { ApiService } from 'ngx-rickandmorty';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExtendedCharacter } from '@ngx-ssr/rickandmorty/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ram-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  public character$: Observable<ExtendedCharacter>;

  constructor(apiService: ApiService, route: ActivatedRoute, title: Title) {
    this.character$ = route.data.pipe(
      map((data) => data.character),
      tap((character) => {
        title.setTitle(`${character.name} | Characters | Rick and Morty`);
      })
    );
  }
}

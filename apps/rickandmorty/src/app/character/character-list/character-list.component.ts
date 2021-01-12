import { Component } from '@angular/core';
import { Character, CharacterFilter, Response } from 'ngx-rickandmorty';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FilterService } from '@ngx-ssr/rickandmorty/utils';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'ram-character',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  providers: [TuiDestroyService, FilterService],
})
export class CharacterListComponent {
  readonly characterResponse$: Observable<Response<Character, CharacterFilter>>;
  readonly form: FormGroup;

  constructor(
    private filter: FilterService,
    route: ActivatedRoute,
    title: Title
  ) {
    title.setTitle('Characters | Rick and Morty');

    this.form = filter.createForm({
      name: [null],
      status: [null],
      species: [null],
      type: [null],
      gender: [null],
    });

    this.characterResponse$ = route.data.pipe(
      map((data) => data.characterResponse)
    );
  }
}

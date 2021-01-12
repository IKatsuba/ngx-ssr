import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './character/character.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLineClampModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';

@NgModule({
  declarations: [CharacterListComponent, CharacterComponent],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiButtonModule,
    TuiAvatarModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
    TuiBadgedContentModule,
    TuiIslandModule,
    TuiLineClampModule,
    TuiDataListModule,
  ],
})
export class CharacterModule {}

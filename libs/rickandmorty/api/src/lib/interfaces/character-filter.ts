import { CharacterGender } from '../enums/character-gender';
import { CharacterStatus } from '../enums/character-status';
import { Filter } from './filter';

export interface CharacterFilter extends Filter {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}

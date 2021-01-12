import { Character, Episode } from 'ngx-rickandmorty';

export interface ExtendedCharacter extends Omit<Character, 'episode'> {
  episode: Episode[];
}

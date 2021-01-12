import { Character, Episode } from 'ngx-rickandmorty';

export interface ExtendedEpisode extends Omit<Episode, 'characters'> {
  characters: Character[];
}

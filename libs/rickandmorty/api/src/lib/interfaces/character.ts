import { CharacterGender } from '../enums/character-gender';
import { RawCharacter } from './raw-character';
import { extractIdsFromUrl } from '../helpers/extract-ids-from-url';
import { CharacterStatus } from '../enums/character-status';

export class Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    id: number;
  };
  location: {
    name: string;
    id: number;
  };
  image: string;
  episode: number[];
  url: string;
  created: Date;

  public static fromJson({
    origin,
    location,
    episode,
    created,
    ...common
  }: RawCharacter): Character {
    const character = new Character();

    Object.assign(character, common);

    character.origin = {
      name: origin.name,
      id: extractIdsFromUrl(origin.url)[0],
    };

    character.location = {
      name: location.name,
      id: extractIdsFromUrl(location.url)[0],
    };

    character.episode = episode.map(extractIdsFromUrl).map(([id]) => id);

    character.created = new Date(created);

    return character;
  }
}

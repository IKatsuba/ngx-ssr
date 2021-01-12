import { RawEpisode } from './raw-episode';
import { extractIdsFromUrl } from '../helpers/extract-ids-from-url';

export class Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: number[];
  url: string;
  created: Date;

  public static fromJson({
    characters,
    created,
    ...common
  }: RawEpisode): Episode {
    const episode = new Episode();

    Object.assign(episode, common);

    episode.characters = characters.map(extractIdsFromUrl).map(([id]) => id);

    episode.created = new Date(created);

    return episode;
  }
}

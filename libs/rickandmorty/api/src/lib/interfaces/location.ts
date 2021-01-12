import { RawLocation } from './raw-location';
import { extractIdsFromUrl } from '../helpers/extract-ids-from-url';

export class Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: number[];
  url: string;
  created: Date;

  public static fromJson({
    created,
    residents,
    ...common
  }: RawLocation): Location {
    const location = new Location();

    Object.assign(location, common);

    location.residents = residents.map(extractIdsFromUrl).map(([id]) => id);

    location.created = new Date(created);

    return location;
  }
}

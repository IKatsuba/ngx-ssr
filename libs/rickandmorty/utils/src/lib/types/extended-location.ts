import { Character, Location } from 'ngx-rickandmorty';

export interface ExtendedLocation extends Omit<Location, 'residents'> {
  residents: Character[];
}

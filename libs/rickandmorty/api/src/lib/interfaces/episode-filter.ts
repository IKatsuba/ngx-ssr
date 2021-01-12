import { Filter } from './filter';

export interface EpisodeFilter extends Filter {
  name?: string;
  episode?: string;
}

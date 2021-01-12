import { Filter } from './filter';

export interface LocationFilter extends Filter {
  name?: string;
  type?: string;
  dimension?: string;
}

import { Stream } from 'xstream';
import { Sources, Sinks } from 'components/App';

interface LayoutSources extends Sources {
  component: Partial<Sinks>;
}

export interface Layout {
  (sources: LayoutSources): Partial<Sinks>;
}

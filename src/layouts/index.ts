import { Stream } from 'xstream';
import { Sources, Sinks } from 'components/App';

interface LayoutSources extends Sources {
  component$: Stream<Sinks>;
}

export interface Layout {
  (sources: LayoutSources): Sinks;
}

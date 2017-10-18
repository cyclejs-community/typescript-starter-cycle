import { Stream } from 'xstream';
import { DOMSource, VNode, div } from '@cycle/dom';

export interface Sources {
  dom: DOMSource;
}

export interface Sinks {
  dom: Stream<VNode>;
}

const xs = Stream;

export const App = (sources: Sources): Sinks => {
  return {
    dom: xs.of(div('.app'))
  };
};

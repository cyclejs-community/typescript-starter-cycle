import { Stream, MemoryStream } from 'xstream';
import { DOMSource, VNode, div } from '@cycle/dom';
import { HistoryInput, Location } from '@cycle/history';

export interface Sources {
  dom: DOMSource;
  history: MemoryStream<Location>;
}

export interface Sinks {
  dom: Stream<VNode>;
  history: Stream<HistoryInput | string>;
}

const xs = Stream;

export const App = (sources: Sources): Sinks => {
  return {
    dom: xs.of(div('.app', ['Hello from Cycle.js!'])),
    history: xs.of('')
  };
};

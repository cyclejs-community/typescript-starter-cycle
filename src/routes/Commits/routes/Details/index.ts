import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { h2 } from '@cycle/dom';

const xs = Stream;

export const Details: RouteComponent = sources => ({
  dom: xs.of(h2(['Details'])),
  history: xs.empty()
});

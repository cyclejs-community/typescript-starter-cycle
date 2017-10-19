import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { h2 } from '@cycle/dom';

const xs = Stream;

export const Home: RouteComponent = sources => ({
  dom: xs.of(h2(['Home'])),
  history: xs.empty()
});

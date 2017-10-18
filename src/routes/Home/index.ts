import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div } from '@cycle/dom';

const xs = Stream;

export const Home: RouteComponent = sources => ({
  dom: xs.of(div(['Home'])),
  history: xs.empty()
});

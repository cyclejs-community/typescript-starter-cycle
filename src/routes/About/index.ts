import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div } from '@cycle/dom';

const xs = Stream;

export const About: RouteComponent = sources => ({
  dom: xs.of(div(['About'])),
  history: xs.empty()
});

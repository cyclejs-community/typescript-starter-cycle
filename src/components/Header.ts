import { Stream } from 'xstream';
import { VNode, div, h1, em } from '@cycle/dom';

interface Sinks {
  dom: Stream<VNode>;
}

const xs = Stream;

export const Header = () => ({
  dom: xs.of(
    div('.header', [
      h1([
        'TypeScript Starter Cycle',
        em('An opinionated starter for Cycle.js projects powered by TypeScript')
      ])
    ])
  )
});

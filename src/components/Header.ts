import { Stream } from 'xstream';
import { VNode, div, h1, em, br } from '@cycle/dom';
import { style } from 'typestyle';
import { rem } from 'csx';

interface Sinks {
  dom: Stream<VNode>;
}

const xs = Stream;

const className = style({
  $nest: {
    '& h1': {
      marginBottom: 0
    },
    '& em': {
      fontSize: rem(1)
    }
  }
});

export const Header = () => ({
  dom: xs.of(
    div(`.${className}`, [
      h1([
        'TypeScript Starter Cycle',
        br(),
        em('An opinionated starter for Cycle.js projects powered by TypeScript')
      ])
    ])
  )
});

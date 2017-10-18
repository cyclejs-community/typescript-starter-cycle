import { pluck } from 'utils/pluck';
import { Layout } from './';
import { Header } from 'components/Header';
import { Stream } from 'xstream';
import { header, div, hr, main } from '@cycle/dom';
import { style } from 'typestyle';
import { rem } from 'csx';

const className = style({
  $nest: {
    '&>header': {
      padding: rem(1),
    },
    '&>main': {
      padding: rem(1)
    }
  }
});

const xs = Stream;

export const HeaderLayout: Layout = ({ component: { dom, history } }) => {
  const headerDom$ = Header().dom;
  const vdom$ =
    xs.combine(headerDom$, dom)
      .map(([ headerDom, component ]) =>
        div(`.header.layout.${className}`, [
          header(headerDom),
          hr(),
          main(component)
        ])
      );
  return {
    dom: vdom$,
    history
  };
};

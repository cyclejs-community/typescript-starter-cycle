import { pluck } from 'utils/pluck';
import { Layout } from './';
import { Header } from 'components/Header';
import { Stream } from 'xstream';
import { header, div, main } from '@cycle/dom';
import { style } from 'typestyle';

const className = style({
  background: 'white'
});

const xs = Stream;

export const HeaderLayout: Layout = ({ component: { dom, history } }) => {
  const headerDom$ = Header().dom;
  const vdom$ =
    xs.combine(headerDom$, dom)
      .map(([ headerDom, component ]) =>
        div(`.header.layout.${className}`, [
          header(headerDom),
          main(component)
        ])
      );
  return {
    dom: vdom$,
    history
  };
};

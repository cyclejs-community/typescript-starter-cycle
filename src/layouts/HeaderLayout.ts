import { pluck } from './utils';
import { Layout } from './';
import { Header } from '../components/Header';
import { Stream } from 'xstream';
import { header, div, main } from '@cycle/dom';
import { style } from 'typestyle';

const className = style({
  background: 'white'
});

const xs = Stream;

export const HeaderLayout: Layout = sources => {
  const headerDom$ = Header().dom;
  const componentDom$ = pluck(sources.component$, c => c.dom);
  const vdom$ =
    xs.combine(headerDom$, componentDom$)
      .map(([ headerDom, component ]) =>
        div(`.header.layout.${className}`, [
          header(headerDom),
          main(component)
        ])
      );
  return {
    dom: vdom$,
    history: pluck(sources.component$, c => c.history)
  };
};

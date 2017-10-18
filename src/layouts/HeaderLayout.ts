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

export const HeaderLayout: Layout = ({ dom, history, component: { dom: componentDom, history: componentHistory } }) => {
  const headerComponent = Header({ dom, history });
  const vdom$ =
    xs.combine(headerComponent.dom, componentDom)
      .map(([headerDom, component]) =>
        div(`.header.layout.${className}`, [
          header(headerDom),
          hr(),
          main(component)
        ])
      );
  return {
    dom: vdom$,
    history: componentHistory
  };
};

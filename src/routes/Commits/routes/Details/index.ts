import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div, h2 } from '@cycle/dom';
import { BackButton } from 'components/BackButton';
import { style } from 'typestyle';
import { rem } from 'csx';

const className = style({
  display: 'inline',
  marginLeft: rem(1)
});

export const Details: RouteComponent = ({ dom, history, github }) => {
  const backButton = BackButton({ dom });
  const vdom$ =
    backButton.dom.map(button =>
      div([
        button,
        h2(`.${className}`, ['Details'])
      ])
    );
  return {
    dom: vdom$,
    history: backButton.history
  };
};

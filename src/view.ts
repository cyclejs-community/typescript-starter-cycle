import { Stream } from 'xstream';
import { div, label, input, hr, h1, VNode } from '@cycle/dom';
import { IState } from './definitions';

function view(state: IState): Stream<VNode> {
  const vdom$ =
    state.message$
      .map(message =>
        div('#root', [
          label('Name:'),
          input('.field', { attr: { type: 'text' } }),
          hr(),
          h1([message]),
        ])
      );
  return vdom$;
}

export default view;
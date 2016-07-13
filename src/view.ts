import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, label, input, hr, h1 } from '@cycle/dom';

function view(message$: Stream<string>): ISinks {
  const vTree$ =
    message$
      .map(message =>
        div('#root', [
          label('Name:'),
          input('.field', { attr: { type: 'text' } }),
          hr(),
          h1([message]),
        ])
      );
  const sinks = {
    dom: vTree$
  };
  return sinks;
}

export default view;
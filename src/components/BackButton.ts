import { Stream } from 'xstream';
import { HistoryInput } from '@cycle/history';
import { DOMSource, VNode, button } from '@cycle/dom';
import isolate from '@cycle/isolate';

interface Sources {
  dom: DOMSource;
  class$?: Stream<string>;
}

interface Sinks {
  dom: Stream<VNode>;
  history: Stream<HistoryInput>;
}

const xs = Stream;

const BackButtonComponent = ({ dom, class$ }: Sources): Sinks => {
  const goBack$ =
    dom.select('button')
      .events('click', { preventDefault: true })
      .mapTo<HistoryInput>({ type: 'goBack' });
  const vdom$ =
    (class$ || xs.of(''))
      .map(className => button(`.back-button.${className}`, ['Back']));
  return {
    dom: vdom$,
    history: goBack$
  }
};

export const BackButton = (sources: Sources): Sinks => isolate(BackButtonComponent)(sources);

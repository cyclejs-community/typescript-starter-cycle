import { Stream, MemoryStream } from 'xstream';
import { DOMSource, VNode, div } from '@cycle/dom';
import { HistoryInput, Location } from '@cycle/history';
import { resolve } from 'routes';
import { pluck } from 'utils/pluck';

export interface Sources {
  dom: DOMSource;
  history: MemoryStream<Location>;
}

export interface Sinks {
  dom: Stream<VNode>;
  history: Stream<HistoryInput | string>;
}

const xs = Stream;

export const App = (sources: Sources): Sinks => {
  const resolution$ =
    sources.history
      .map(location => resolve(location.pathname));
  const app$ =
    xs.merge(
      resolution$
        .filter(resolution => !!resolution.getLayout)
        .map(({ getComponent, getLayout, ...resolution }) =>
          xs.fromPromise(Promise.all([getComponent(), getLayout()]))
            .map(([Component, Layout]) => {
              const component = Component({ ...sources, ...(resolution.sources || {}) });
              const layoutSources = { ...sources, component };
              return Layout(layoutSources);
            })
        ),
      resolution$
        .filter(resolution => !resolution.getLayout)
        .map(({ getComponent, ...resolution }) =>
          xs.fromPromise(getComponent().then(Component => Component({ ...sources, ...(resolution.sources || {}) })))
        )
    )
    .flatten();
  return {
    dom: pluck(app$, app$ => app$.dom),
    history: pluck(app$, app$ => app$.history)
  }
};

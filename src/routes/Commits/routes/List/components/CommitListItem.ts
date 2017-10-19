import { Stream } from 'xstream';
import { DOMSource, VNode, li } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { Commit } from 'drivers/github';

interface Sources {
  dom: DOMSource;
  commit$: Stream<Commit>;
}

interface Sinks {
  dom: Stream<VNode>;
  history: Stream<string>;
}

const CommitListItemComponent = ({ dom, commit$ }: Sources): Sinks => {
  const navigateTo$ =
    commit$
      .map(({ sha }) => dom.select('li').events('click', { preventDefault: true }).map(ev => `/commits/${sha}`))
      .flatten();
  const vdom$ =
    commit$
      .map(({ sha, commit: { message, author: { name, email, date } } }) =>
        li([ message ])
      );
  return {
    dom: vdom$,
    history: navigateTo$
  };
}

export const CommitListItem = (sources: Sources): Sinks => isolate(CommitListItemComponent)(sources);

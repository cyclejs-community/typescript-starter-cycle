import { Sources as RouteComponentSources, Sinks } from 'components/App';
import { Stream } from 'xstream';
import { div, h2, h3, hr, p, h4, strong, em } from '@cycle/dom';
import { BackButton } from 'components/BackButton';
import { style } from 'typestyle';
import { rem } from 'csx';
import { Commit } from 'drivers/github';

interface Sources extends RouteComponentSources {
  sha$: Stream<string>;
}

const className = style({
  display: 'inline',
  marginLeft: rem(1)
});

const xs = Stream;

const getDom = ({ sha, commit: { message, author: { name, email, date } } }: Commit) => [
  h3([message.split('\n\n')[0]]),
  h4([strong([name])]),
  h4([email]),
  h4([em([date])]),
  p([message.split('\n\n')[1] || ''])
];

export const Details: (sources: Sources) => Partial<Sinks> = ({ dom, github, sha$ }) => {
  const backButton = BackButton({ dom });
  const details$ =
    sha$
      .map(sha => github.commits(sha))
      .flatten()
      .remember();
  const loaded$ = details$.mapTo(true).startWith(false).debug();
  const contents$ = loaded$.map(loaded =>
    loaded
      ? details$.map(commit => getDom(commit))
      : xs.of([h3(['Loading...'])])
  ).flatten();
  const vdom$ =
    xs.combine(backButton.dom, contents$)
      .map(([backButton, contents]) =>
        div([
          backButton,
          h2(`.${className}`, ['Details']),
          hr(),
          ...contents
        ])
      );
  return {
    dom: vdom$,
    history: backButton.history,
    github: sha$
  };
};

import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div, h2, p, ul, li, VNode } from '@cycle/dom';
import { Commit } from 'drivers/github';
import { CommitListItem } from './components/CommitListItem';

const xs = Stream;

export const List: RouteComponent = ({ dom, history, github }) => {
  const commits$ = github.commits();
  const loaded$ = commits$.mapTo(true).startWith(false);
  const commitListItems$ =
    commits$.map(commits =>
      commits
        .filter(commit => !commit.commit.message.startsWith('Merge'))
        .map(commit => CommitListItem({ dom, commit$: xs.of(commit) }))
    );
  const navigateTo$ =
    commitListItems$
      .map(clis => xs.merge<string>(...clis.map(cli => cli.history)))
      .flatten();
  const commitListItemDoms$ =
    commitListItems$
      .map<Stream<VNode[]>>(clis => xs.combine(...clis.map(cli => cli.dom)))
      .flatten();
  const content$ = loaded$.map(loaded =>
    loaded
      ? commitListItemDoms$.map(commits => ul(commits))
      : xs.of(p(['Loading...']))
    ).flatten();
  const vdom$ = content$.map(content =>
    div([
      h2('Commits List'),
      content
    ])
  );
  const request$ = xs.of('');
  return {
    dom: vdom$,
    history: navigateTo$,
    github: request$
  };
};

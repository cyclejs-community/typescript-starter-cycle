import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div, h2, ul, li, VNode } from '@cycle/dom';
import { Commit } from 'drivers/github';
import { CommitListItem } from './components/CommitListItem';

const xs = Stream;

export const List: RouteComponent = ({ dom, history, github }) => {
  const commits$ = github.commits();
  const commitListItems$ =
    commits$.map(commits =>
      commits
        .filter(commit => !commit.commit.message.startsWith('Merge'))
        .map(commit => CommitListItem({ dom, commit$: xs.of(commit) }))
    );
  const commitListItemDoms$ =
    commitListItems$
      .map<Stream<VNode[]>>(clis => xs.combine(...clis.map(cli => cli.dom)))
      .flatten();
  const vdom$ = commitListItemDoms$.map(commits =>
    div([
      h2('Commits List'),
      ul(commits)
    ])
  );
  const navigateTo$ =
    commitListItems$
      .map(clis => xs.merge<string>(...clis.map(cli => cli.history)))
      .flatten();;
  const request$ = xs.of('');
  return {
    dom: vdom$,
    history: navigateTo$,
    github: request$
  };
};

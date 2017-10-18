import { RouteComponent } from 'routes';
import { Stream } from 'xstream';
import { div, h2, ul, li } from '@cycle/dom';
import { Commit } from 'drivers/github';

const xs = Stream;

export const List: RouteComponent = ({ dom, history, github }) => {
  const commits$ = github.commits();
  const commitListItems$ =
    commits$.map(commits =>
      commits.map(commit => li({ attrs: { 'data-sha': commit.sha } }, [commit.commit.message]))
    );
  const vdom$ = commitListItems$.map(commits =>
    div([
      h2('Commits List'),
      ul(commits)
    ])
  );
  const navigateTo$ = xs.empty();
  const request$ = xs.of('');
  return {
    dom: vdom$,
    history: navigateTo$,
    github: request$
  };
};

import { run } from '@cycle/run';
import { App } from './components/App';
import { makeDOMDriver } from '@cycle/dom';
import { makeHashHistoryDriver } from '@cycle/history';

run(App, {
  dom: makeDOMDriver('#app'),
  history: makeHashHistoryDriver()
});

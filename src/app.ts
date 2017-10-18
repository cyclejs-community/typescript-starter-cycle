import { run } from '@cycle/run';
import { App } from './components/App';
import { makeDOMDriver } from '@cycle/dom';

run(App, {
  dom: makeDOMDriver('#app')
});

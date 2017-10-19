import { run } from '@cycle/run';
import { App } from 'components/App';
import { makeDOMDriver } from '@cycle/dom';
import { captureClicks, makeHashHistoryDriver } from '@cycle/history';
import { cssRaw } from 'typestyle';
import { normalize, setupPage } from 'csstips';
import { makeGithubDriver } from 'drivers/github';

normalize();
setupPage('#app');

cssRaw(`
  #app {
    font-family: medium-content-sans-serif-font,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Arial,sans-serif;
    background: white;
    color: #333;
    display: flex;
  }

  .layout {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    font-weight: 100;
  }
`);

run(App, {
  dom: makeDOMDriver('#app'),
  history: captureClicks(makeHashHistoryDriver()),
  github: makeGithubDriver()
});

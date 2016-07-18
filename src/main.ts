import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';

function main(sources: ISources): ISinks {
  const state = model(intent(sources)); 
  const vdom$ = view(state);
  return {
      dom: vdom$
  };
}

export default main;
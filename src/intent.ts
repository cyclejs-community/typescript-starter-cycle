import { ISources } from './definitions';
import { Stream } from 'xstream';

export interface IIntent {
  name$: Stream<string>
}

function intent(sources: ISources): IIntent {
  const dom = sources.dom;
  const intent = {
    name$: dom
      .select('.field')
      .events('input')
      .map(ev => (ev.target as HTMLInputElement).value)
      .startWith('')
  };
  return intent;
}

export default intent;
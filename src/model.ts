import { Stream } from 'xstream';
import { IIntent } from './intent';

function model(intent: IIntent): Stream<string> {
  return intent
    .name$.map(name =>
      name
        ? `Hello, ${name}!`
        : 'Hello! Please enter your name...');
}

export default model;
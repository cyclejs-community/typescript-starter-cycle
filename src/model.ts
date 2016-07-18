import { Stream } from 'xstream';
import { IIntent } from './intent';
import { IState } from './definitions';

function model(intent: IIntent): IState {
  const message$ =
    intent.name$
      .map(name =>
        name
          ? `Hello, ${name}!`
          : 'Hello! Please enter your name...');
  return {
    message$
  };
}

export default model;
import { Stream } from 'xstream';

export const pluck = <T, U>(stream: Stream<T>, getter: (single: T) => Stream<U>): Stream<U> =>
  stream.map(str => getter(str) || Stream.empty()).flatten();

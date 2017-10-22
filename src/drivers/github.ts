import { Stream } from 'xstream';
import { HTTPSource, RequestOptions, Response, makeHTTPDriver } from '@cycle/http';

const toRequestOptions = (sha: string): RequestOptions => {
  const single = !!sha;
  const url =
    'https://api.github.com/repos/cyclejs-community/typescript-starter-cycle/commits'
    + (single ? `/${sha}` : '');
  const category = single ? `commit-by-sha-${sha}` : 'commits';
  return {
    url,
    method: 'GET',
    category,
    accept: 'application/vnd.github.v3+json'
  };
};

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: Date;
    }
  }
}

const xs = Stream;

export class GithubSource {
  http: HTTPSource;
  commits(): Stream<Commit[]>;
  commits(sha: string): Stream<Commit>;
  commits(sha?: string) {
    return !!sha
      ? this.__commitBySha(sha)
      : this.__commits();
  }
  constructor(commitsRequest$: Stream<string>) {
    const request$ = commitsRequest$.map(sha => toRequestOptions(sha));
    this.http = makeHTTPDriver()(request$, 'githubHttp');
  }
  private __commits() {
    const response$$: Stream<Stream<Response>> = this.http.select('commits');
    return response$$
      .map(response$ => response$.replaceError(() => xs.of({ status: 500, body: [] } as Response)))
      .flatten()
      .map(response => response.body as Commit[]);
  }
  private __commitBySha(sha: string) {
    const response$$: Stream<Stream<Response>> = this.http.select(`commit-by-sha-${sha}`);
    return response$$
      .map(response$ => response$.replaceError(() => xs.of({ status: 500, body: {} } as Response)))
      .flatten()
      .map(response => response.body as Commit);
  }
}

export const makeGithubDriver = () => (commitsRequest$: Stream<string>) => new GithubSource(commitsRequest$);

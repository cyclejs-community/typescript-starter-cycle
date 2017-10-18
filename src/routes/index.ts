import { Stream } from 'xstream';
import { Home } from './Home';
import { Sources, Sinks } from 'components/App';
import { Layout } from 'layouts';

export interface RouteComponent {
  (sources: Sources): Sinks;
}

export interface RouteResolution<T> {
  path?: string;
  getComponent: () => Promise<RouteComponent>;
  getLayout: () => Promise<Layout>;
  sources?: T
}

export interface RouteDefinitions {
  [path: string]: RouteResolution<any>;
}

export const routes: RouteDefinitions = {
  '/': {
    getComponent: async () => await Promise.resolve(Home),
    getLayout: async () => {
      const { HeaderLayout } = await import(/* webpackChunkName: "HeaderLayout" */'layouts/HeaderLayout');
      return HeaderLayout;
    }
  }
};

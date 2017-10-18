import { Stream } from 'xstream';
import { Home } from './Home';
import { Sources, Sinks } from 'components/App';
import { Layout } from 'layouts';
import switchPath from 'switch-path';

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

const routes: RouteDefinitions = {
  '/': {
    getComponent: async () => await Promise.resolve(Home),
    getLayout: async () => {
      const { HeaderLayout } = await import(/* webpackChunkName: "HeaderLayout" */'layouts/HeaderLayout');
      return HeaderLayout;
    }
  }
};

const resolveImplementation = <T>(routes: RouteDefinitions, route: string): RouteResolution<T> => {
  const { path, value: { getComponent, getLayout, sources } } = switchPath(route, routes);
  return {
    path,
    getComponent,
    getLayout,
    sources
  };
}

export const resolve = (route: string) => resolveImplementation(routes, route);

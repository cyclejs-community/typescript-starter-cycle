import { Stream } from 'xstream';
import { Home } from './Home';
import { Sources, Sinks } from 'components/App';
import { Layout } from 'layouts';
import switchPath from 'switch-path';
import { Commits } from './Commits';

export interface RouteComponent {
  (sources: Sources): Partial<Sinks>;
}

interface RouteResolution {
  path?: string;
  getComponent: () => Promise<RouteComponent>;
  getLayout?: () => Promise<Layout>;
  sources?: any;
}

interface ParameterizedRouteResolution {
  (a: string, b?:string, c?: string, d?: string): RouteResolution;
}

export interface RouteDefinitions {
  [path: string]: RouteResolution | ParameterizedRouteResolution | RouteDefinitions;
}

// Example of async layout loading
const getHeaderLayout = async () => {
  const { HeaderLayout } = await import(/* webpackChunkName: "HeaderLayout" */'layouts/HeaderLayout');
  return HeaderLayout;
};

// Helper to directly load components and layouts
const getComponent = <T>(component: T) => async () => await Promise.resolve(component);

const routes: RouteDefinitions = {
  '/': {
    getComponent: getComponent(Home),
    getLayout: getHeaderLayout
  },
  '/about': {
    // Example of async component loading
    // The component does not expose its own async loader because the requiring component
    // should have the power to decide on async loading.
    getComponent: async () => {
      const { About } = await import(/* webpackChunkName: "About" */'./About');
      return About;
    },
    getLayout: getHeaderLayout
  },
  // Example of loading route definitions (and nested routes)
  // The synchronous sub routes are instantly loaded, the async sub routes
  // are loaded asynchronously on demand.
  '/commits': Commits
};

const resolveImplementation = <T>(routes: RouteDefinitions, route: string): RouteResolution => {
  const { path, value: { getComponent, getLayout, sources } } = switchPath(route, routes);
  return {
    path,
    getComponent,
    getLayout,
    sources
  };
}

export const resolve = (route: string) => resolveImplementation(routes, route);

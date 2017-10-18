import { Stream } from 'xstream';
import { DOMSource, VNode, nav, a } from '@cycle/dom';
import isolate from '@cycle/isolate';

interface Sources {
  dom: DOMSource;
}

interface Sinks {
  dom: Stream<VNode>;
  history: Stream<string>;
}
const xs = Stream;

const NavMenuComponent = ({ dom }: Sources): Sinks => {
  const navigateTo$ =
    dom.select('a')
      .events('click', { preventDefault: true })
      .map(ev => (ev.target as HTMLAnchorElement).href);
  const vdom$ =
    xs.of(nav([
      a({ attrs: { href: '#/', title: 'Home' } }, ['Home']),
      a({ attrs: { href: '#/about', title: 'About' } }, ['About']),
    ]));
  return {
    dom: vdom$,
    history: navigateTo$
  };
};

export const NavMenu = (sources: Sources): Sinks => isolate(NavMenuComponent)(sources);

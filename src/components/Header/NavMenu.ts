import { Stream } from 'xstream';
import { DOMSource, VNode, nav, a } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { style } from 'typestyle';
import { rem } from 'csx';

interface Sources {
  dom: DOMSource;
}

interface Sinks {
  dom: Stream<VNode>;
  history: Stream<string>;
}

const navLink = {
  color: '#333',
  fontSize: rem(1),
  fontWeight: 700,
  marginRight: rem(1),
  textDecoration: 'none',
};
const navLinkHover = {
  ...navLink,
  cursor: 'pointer'
};

const className = style({
  display: 'flex',
  alignContent: 'flex-end',
  $nest: {
    '& > a': {
      ...navLink,
      textTransform: 'uppercase',
      $nest: {
        '&:first-child': {
          marginLeft: 'auto'
        },
        '&&:hover': navLinkHover,
      }
    }
  }
});

const xs = Stream;

const NavMenuComponent = ({ dom }: Sources): Sinks => {
  const navigateTo$ =
    dom.select('a')
      .events('click', { preventDefault: true })
      .map(ev => (ev.target as HTMLAnchorElement).href);
  const vdom$ =
    xs.of(
      nav(`.${className}`, [
        a({ attrs: { href: '#/', title: 'Home' } }, ['Home']),
        a({ attrs: { href: '#/about', title: 'About' } }, ['About']),
      ])
    );
  return {
    dom: vdom$,
    history: navigateTo$
  };
};

export const NavMenu = (sources: Sources): Sinks => isolate(NavMenuComponent)(sources);

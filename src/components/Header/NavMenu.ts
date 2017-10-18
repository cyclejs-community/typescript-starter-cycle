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

const whiteColor = { color: 'white' };
const noTextDecoration = { textDecoration: 'none' };
const cursorPointer = { cursor: 'pointer' };
const navLink = {
  ...whiteColor,
  ...noTextDecoration
};
const navLinkHover = {
  ...navLink,
  ...cursorPointer
};

const className = style({
  display: 'flex',
  alignContent: 'flex-end',
  $nest: {
    '& > a': {
      ...navLink,
      marginRight: rem(1),
      $nest: {
        '&:first-child': {
          marginLeft: 'auto'
        },
        '&:link': navLink,
        '&&:visited': navLink,
        '&&&:hover': navLinkHover,
        '&&&&:active': navLink,
        '&&&&&:focus': navLink
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

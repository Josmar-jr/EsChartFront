import { LinkProps } from 'next/link';
import { ReactElement, ReactNode } from 'react';
import { ActiveLink } from '../ActiveLink';

type NavLinkProps = LinkProps & {
  children: ReactNode;
  href: string;
};

export function NavLink({ children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <a>{children}</a>
    </ActiveLink>
  );
}

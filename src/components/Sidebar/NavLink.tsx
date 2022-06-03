import { LinkProps } from 'next/link';
import { ReactElement } from 'react';
import { ActiveLink } from '../ActiveLink';

type NavLinkProps = LinkProps & {
  icon: ReactElement;
  children: string;
  href: string;
};

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <a className="flex">
        {icon}
        {children}
      </a>
    </ActiveLink>
  );
}

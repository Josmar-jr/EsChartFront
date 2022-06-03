import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

type ActiveLink = LinkProps & {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
};

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLink) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: isActive ? 'text-red-600' : 'text-blue-100'
      })}
    </Link>
  );
}
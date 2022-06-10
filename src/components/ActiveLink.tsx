import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

type ActiveLink = LinkProps & {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
};

const afterStyle =
  "after:content-[''] after:absolute after:h-10 after:w-[3.8px] after:rounded-r after:block after:top-[-4px] after:left-[-1px]";

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
        className: `hover:text-primary transition-all focus:ring focus:secondary outline-none inline-block px-[12px] w-full py-1 relative ${afterStyle} ${
          isActive ? 'text-primary sm:dark:after:bg-secondary dark:text-secondary sm:after:bg-primary' : 'text-slate-500 dark:text-slate-400'
        }`
      })}
    </Link>
  );
}

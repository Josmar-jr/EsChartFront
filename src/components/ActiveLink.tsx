import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

type ActiveLink = LinkProps & {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
};

const afterStyle =
  "after:content-[''] after:absolute after:h-[1.5px] after:w-full after:rounded-r after:block after:top-[35px] after:left-[-1px]";

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
        className: `text-sm py-2 hover:bg-gray-200 transition-colors rounded-md transition-all focus:ring focus:secondary outline-none inline-block px-[12px] w-full py-1 relative ${afterStyle} ${
          isActive ? 'text-primary font-bold dark:after:bg-secondary dark:text-secondary after:bg-primary' : 'text-slate-500 dark:text-slate-400'
        }`
      })}
    </Link>
  );
}

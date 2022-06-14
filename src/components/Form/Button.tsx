import { ButtonHTMLAttributes, ReactNode } from 'react';

import { CircleNotch } from 'phosphor-react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children: ReactNode;
};

export function Button({ isLoading = false, children, ...rest }: ButtonProps) {
  return (
    <button
      type="submit"
      className="disabled:bg-primaryDark dark:bg-secondary disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-primary dark:border-secondary text-sm font-medium rounded-md text-white bg-primary hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:dark:ring-secondary"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <CircleNotch
          className="animate-spin"
          size={18}
          weight="bold"
          color="white"
        />
      ) : (
        children
      )}
    </button>
  );
}

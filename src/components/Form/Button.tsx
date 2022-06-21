import { ButtonHTMLAttributes, ReactNode } from 'react';

import { CircleNotch } from 'phosphor-react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  customClass?: string;
  children: ReactNode;
  variant?: 'outline' | 'solid';
};

const customBtn = {
  solid:
    'disabled:bg-primaryDark dark:bg-secondary relative justify-center py-2 px-4 border border-primary dark:border-secondary text-sm font-medium rounded-md text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:dark:ring-secondary',
  outline:
    'bg-transparent hover:bg-primary hover:text-white focus:bg-primary focus:text-white justify-center py-2 px-4 border-2 border-primary dark:border-secondary text-sm font-medium rounded-md text-slate-900 hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:dark:ring-secondary'
};

export function Button({
  isLoading = false,
  children,
  customClass,
  variant = 'solid',
  ...rest
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${customClass} ${customBtn[variant]} relative transition-colors disabled:cursor-not-allowed group flex w-full`}
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

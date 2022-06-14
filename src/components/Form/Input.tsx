import * as Tooltip from '@radix-ui/react-tooltip';
import { WarningCircle } from 'phosphor-react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: FieldError;
  customClass?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, customClass = '', error = null, ...rest },
  ref
) => {
  return (
    <label
      htmlFor={name}
      data-testid="label-wrapper"
      className="flex self-center items-center relative flex-1"
    >
      <input
        id={name}
        name={name}
        aria-label={name}
        className={`${customClass} dark:text-slate-200 appearance-none w-full px-3 py-2 dark:border-slate-600 dark:bg-slate-900 bg-neutral ${
          !!error
            ? 'border-red-600 focus:border-red-700'
            : 'border-gray-300 focus:border-primary'
        } border placeholder-gray-500 text-gray-900 focus:z-10 focus:outline-none sm:text-sm`}
        {...rest}
        ref={ref}
      />
      {!!error && (
        <div role="alert" className="flex items-center absolute right-0 z-10">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger className="hover:text-red-600 text-red-500">
                <WarningCircle
                  size={18}
                  weight="bold"
                  className="m-2 bg-neutral"
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-red-100 px-2 py-1 text-xs w-26"
              >
                <Tooltip.Arrow className="fill-red-100" />
                {error.message}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      )}
    </label>
  );
};

export const Input = forwardRef(InputBase);

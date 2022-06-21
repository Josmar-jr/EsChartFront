import { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  customClass?: string;
  options?: string[];
  defaultValue?: string;
};

export function Select({
  customClass,
  options,
  defaultValue,
  ...selectProps
}: SelectProps) {
  return (
    <select
      id="small"
      className="block px-3 py-2 w-full text-sm text-gray-900 
      bg-neutral-200 focus:outline-none rounded-lg border border-gray-300 sm:text-md
      focus:ring-primary focus:border-primary
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
      dark:focus:border-blue-500 shadow-sm"
      {...selectProps}
    >
      {options.map(option => {
        if (option === defaultValue) {
          return (
            <option value={option} key={option} defaultValue={option}>
              {option}
            </option>
          );
        }
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

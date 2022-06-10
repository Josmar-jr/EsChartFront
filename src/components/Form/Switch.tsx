interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onChangeChecked: () => void;
}

const afterStyle = `after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-slate-800 after:border-slate-600 after:border after:rounded-full after:h-3 after:w-3 after:transition-all after:translate-x-[-10%] peer-checked:after:translate-x-[110%] peer-checked:after:bg-secondary peer-checked:after:border-secondary`;

const beforeStyle = `bg-gray-200 before:content-[''] before:h-3 before:w-[6.5px] before:rotate-45 before:absolute before:border-r-[3px] before:border-b-[3px] before:border-secondary before:top-[0px] before:left-[6px]`;

export function Switch({ isChecked, onChangeChecked, ...rest }: SwitchProps) {
  return (
    <span className="flex gap-4 items-center justify-center">
      <label htmlFor="default-toggle">
        <span className="cursor-pointer">Tema escuro</span>
      </label>
      <div
        className={`inline-flex relative items-center cursor-pointer border-2 rounded-full ${
          isChecked ? 'border-secondary' : 'border-slate-800'
        }`}
      >
        <input
          type="checkbox"
          defaultChecked={isChecked}
          id="default-toggle"
          className="sr-only peer"
          {...rest}
        />
        <div
          className={`${
            isChecked && beforeStyle
          } ${afterStyle} w-[32px] h-4 outline-none rounded-full peer dark:border-slate-800 peer-checked:bg-slate-900`}
        ></div>
      </div>
    </span>
  );
}

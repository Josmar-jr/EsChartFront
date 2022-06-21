import { Plus } from 'phosphor-react';
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect
} from 'react';
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger
} from 'react-hook-form';

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setImageUrl: Dispatch<SetStateAction<string>>;
  localImageUrl: string;
  setLocalImageUrl: Dispatch<SetStateAction<string>>;
  setError: UseFormSetError<FieldValues | any>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues | any>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setImageUrl,
    localImageUrl,
    setLocalImageUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
  const [isVisibleTextHover, setIsVisibleTextHover] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setImageUrl('');
      setLocalImageUrl('');
      setError('image', null);
      setIsSending(true);

      await onChange(event);
      trigger('image');

      const formData = new FormData();

      formData.append(event.target.name, event.target.files[0]);
      setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
      console.log('ttt', localImageUrl);
      setIsSending(false);
    },
    [onChange, setError, localImageUrl, setImageUrl, setLocalImageUrl, trigger]
  );

  return (
    <label htmlFor={name} className="relative h-44 w-44 items-center mx-auto block cursor-pointer">
      {localImageUrl && !isSending ? (
        <div className="rounded-full w-full h-full relative cursor-pointer border-4 border-primary">
          <img
            src={localImageUrl}
            className="rounded-full w-full h-full object-cover"
            alt="Uploaded photo"
          />
          <div
            onMouseLeave={() => setIsVisibleTextHover(false)}
            onMouseEnter={() => setIsVisibleTextHover(true)}
            className={`absolute ${
              isVisibleTextHover ? 'opacity-100' : 'opacity-0'
            } hover-text z-10 bg-[rgba(0,0,0,0.2)] transition-opacity flex items-center justify-center`}
          >
            <span className={`${isVisibleTextHover ? 'translate-y-12' : 'translate-y-60'} transition-transform block text-xs text-slate-200 text-center pt-2 bg-[rgba(0,0,0,0.8)]`}>
              Click para alterar o avatar
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex-col items-center justify-center border-2 border-primary rounded-full bg-green-200 color-gray-200">
          <div className="w-full h-full">
            <div className="flex h-full items-center justify-center flex-col">
              <Plus size={32} weight="bold" />
              <span className="text-center pt-2">Adicione sua imagem</span>
            </div>
          </div>
        </div>
      )}

      <input
        data-testid={name}
        disabled={isSending}
        id={name}
        name={name}
        onChange={handleImageUpload}
        ref={ref}
        type="file"
        className="hidden"
        {...rest}
      />
    </label>
  );
};

export const FileInput = forwardRef(FileInputBase);

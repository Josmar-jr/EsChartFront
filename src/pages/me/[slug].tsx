import { CircleNotch, NotePencil } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { FileInput } from '../../components/Form/FileInput';
import { Input } from '../../components/Form/Input';
import { Layout } from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';

import { loginSchema } from '../../utils/yupValidation';

type UserInfo = {
  name: string;
  username: string;
  email: string;
  avatar: string;
};

export default function Me() {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const { user } = useAuth();
  console.log("user", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    setError,
    trigger
  } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      avatar: user?.avatar,
      username: user?.username
    }
  });

  useEffect(() => {
    reset({
      email: user?.email,
      name: user?.name,
      avatar: user?.avatar,
      username: user?.username
    });
  }, [user]);

  const handleEditUserInfo = async (data: UserInfo) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto block w-full sm:mb-0">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className="text-slate-500">
          Update your photo and personal details here
        </p>

        <div className="max-w-2xl w-full p-6 border border-gray-300 shadow-md rounded-md my-8">
          <form onSubmit={handleSubmit(handleEditUserInfo)}>
            <div className="flex flex-col-reverse sm:flex-row justify-between w-full gap-2 sm:gap-0">
              <div className="flex flex-col gap-4 w-full sm:w-2/3">
                <div>
                  <Input
                    label="Insire seu e-mail"
                    name="email"
                    customClass="block rounded-md shadow-sm"
                    {...register('email')}
                  />
                </div>
                <div>
                  <Input
                    label="Insire seu nome"
                    name="name"
                    customClass="block rounded-md shadow-sm"
                    {...register('name')}
                  />
                </div>
                <div>
                  <Input
                    label="Insire seu nome de usuário"
                    name="username"
                    customClass="block rounded-md shadow-sm"
                    {...register('username')}
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <FileInput
                  setImageUrl={setImageUrl}
                  localImageUrl={localImageUrl}
                  setLocalImageUrl={setLocalImageUrl}
                  setError={setError}
                  trigger={trigger}
                  {...register('avatar')}
                  error={errors.avatar}
                />
              </div>
            </div>
            <Button
              disabled={!isDirty || isSubmitting}
              type="submit"
              customClass="w-auto mt-16 gap-2"
            >
              {isSubmitting && (
                <CircleNotch
                  className="animate-spin"
                  size={18}
                  weight="bold"
                  color="white"
                />
              )}
              Save changes
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

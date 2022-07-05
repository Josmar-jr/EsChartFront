import { GetStaticProps } from 'next';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { resetPassword } from '../../utils/yupValidation';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';

type ResetPasswordParams = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(resetPassword)
  });

  const handleResetPassword = ({
    password,
    confirmPassword
  }: ResetPasswordParams) => {
    console.log(password, confirmPassword);
  };

  return (
    <main
      role="main"
      className="h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="font-bold text-2xl text-slate-900">Recuperar senha</h1>

      <form
        className="mt-8 space-y-4 max-w-sm w-full"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <div>
          <Input
            name="password"
            type="password"
            error={errors.password}
            placeholder="Nova senha"
            customClass="rounded-lg shadow-sm"
            {...register('password')}
          />
        </div>

        <div>
          <Input
            name="confirm-password"
            type="password"
            error={errors.confirmPassword}
            placeholder="Confirme sua nova senha"
            customClass="rounded-lg shadow-sm"
            {...register('confirmPassword')}
          />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Recuperar
        </Button>
      </form>
    </main>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {}
//   };
// };

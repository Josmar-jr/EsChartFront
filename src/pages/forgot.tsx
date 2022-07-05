import Link from 'next/link';
import Router from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

import { forgotSchema } from '../utils/yupValidation';

import { Button } from '../components/Form/Button';
import { Input } from '../components/Form/Input';
import { api } from '../services/apiClient';
import { withSSRGuest } from '../utils/withSSRGuest';

type SendEmailParams = {
  email: string;
};

export default function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(forgotSchema)
  });

  const { theme } = useTheme();

  const customToast = theme === 'dark' && {
    style: {
      background: '#1e293b',
      color: '#f1f5f9'
    }
  };

  const handleSendEmail = async ({ email }: SendEmailParams) => {
    try {
      await api.post('/extensao_ufrn_api/users/reset_password/', {
        email
      });

      toast.success('Quase lá, dê uma checkada no seu E-mail!', customToast);
      Router.push('/');
    } catch {
      toast.error(
        'Error ao enviar o E-mail de recuperação de senhar!',
        customToast
      );
    }
  };

  return (
    <main
      role="main"
      className="h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="font-bold text-2xl text-slate-900">Recuperar senha</h1>

      <form
        className="mt-8 space-y-4 max-w-sm w-full"
        onSubmit={handleSubmit(handleSendEmail)}
      >
        <div>
          <Input
            name="email"
            error={errors.email}
            placeholder="Email"
            customClass="rounded-lg shadow-sm"
            {...register('email')}
          />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Recuperar
        </Button>

        <Link href="/">
          <a className="text-center block text-sm text-slate-700 outline-none focus:opacity-90 hover:opacity-90 transition-opacity">
            Voltar
          </a>
        </Link>
      </form>
    </main>
  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});

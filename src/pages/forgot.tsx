import Link from 'next/link';
import { Button } from '../components/Form/Button';
import { Input } from '../components/Form/Input';

export default function Forgot() {
  return (
    <main
      role="main"
      className="h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="font-bold text-2xl text-slate-900">Recuperar senha</h1>

      <form className="mt-8 space-y-4 max-w-sm w-full">
        <div>
          <Input
            name="email"
            // error={errors.email}
            placeholder="Email"
            customClass="rounded-lg shadow-sm"
            // {...register('email')}
          />
        </div>

        <Button type="submit" isLoading={false}>
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

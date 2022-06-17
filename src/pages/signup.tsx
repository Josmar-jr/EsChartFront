import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import toast, { Toaster } from 'react-hot-toast';

import { Input } from '../components/Form/Input';
import { withSSRGuest } from '../utils/withSSRGuest';
import { Button } from '../components/Form/Button';
import { signUpSchema } from '../utils/yupValidation';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  return (
    <main
      role="main"
      className="h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-32 lg:w-48">
        <svg
          className="w-full"
          width="128"
          height="38"
          viewBox="0 0 128 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 33.5L42.2222 7H64L56.2222 33.5H36Z"
            fill="#034EA1"
            stroke="#034EA1"
          />
          <path
            d="M18 28.2539L17.1738 33H3.90234L4.72852 28.2539H18ZM10.5117 7.40625L6.06445 33H0.0527344L4.48242 7.40625H10.5117ZM18.1406 17.5664L17.3496 22.1543H5.7832L6.5918 17.5664H18.1406ZM21.6562 7.40625L20.8301 12.1699H7.50586L8.34961 7.40625H21.6562ZM30.0586 27.5508C30.1523 27.0586 30.0059 26.6836 29.6191 26.4258C29.2441 26.1562 28.793 25.957 28.2656 25.8281C27.75 25.6875 27.334 25.5762 27.0176 25.4941C26.3027 25.3066 25.5938 25.0664 24.8906 24.7734C24.1875 24.4688 23.5488 24.0938 22.9746 23.6484C22.4121 23.1914 21.9609 22.6465 21.6211 22.0137C21.293 21.3691 21.1465 20.6191 21.1816 19.7637C21.2168 18.709 21.4805 17.7949 21.9727 17.0215C22.4766 16.248 23.127 15.6094 23.9238 15.1055C24.7207 14.5898 25.5879 14.209 26.5254 13.9629C27.4746 13.7168 28.418 13.6055 29.3555 13.6289C30.6445 13.6406 31.8574 13.8691 32.9941 14.3145C34.1426 14.7598 35.0742 15.4395 35.7891 16.3535C36.5156 17.2676 36.8848 18.4277 36.8965 19.834L31.1484 19.8164C31.1602 19.3594 31.1016 18.9609 30.9727 18.6211C30.8555 18.2812 30.6504 18.0234 30.3574 17.8477C30.0645 17.6602 29.666 17.5664 29.1621 17.5664C28.7871 17.5664 28.418 17.6426 28.0547 17.7949C27.6914 17.9473 27.375 18.1641 27.1055 18.4453C26.8477 18.7266 26.6836 19.0664 26.6133 19.4648C26.543 19.8047 26.5898 20.0918 26.7539 20.3262C26.918 20.5488 27.1406 20.7305 27.4219 20.8711C27.7031 21.0117 27.9961 21.1289 28.3008 21.2227C28.6172 21.3047 28.8984 21.3691 29.1445 21.416C30.2109 21.6738 31.2422 22.0195 32.2383 22.4531C33.2461 22.875 34.0664 23.4785 34.6992 24.2637C35.3438 25.0371 35.6484 26.0684 35.6133 27.3574C35.5781 28.4473 35.2852 29.3789 34.7344 30.1523C34.1836 30.9141 33.4746 31.5352 32.6074 32.0156C31.752 32.4844 30.8262 32.8242 29.8301 33.0352C28.8457 33.2578 27.8906 33.3633 26.9648 33.3516C25.6758 33.3281 24.457 33.0703 23.3086 32.5781C22.1602 32.0742 21.2227 31.3477 20.4961 30.3984C19.7812 29.4375 19.4062 28.2598 19.3711 26.8652L24.7148 26.8828C24.7266 27.4336 24.8262 27.8965 25.0137 28.2715C25.2129 28.6348 25.5 28.916 25.875 29.1152C26.25 29.3027 26.7129 29.3965 27.2637 29.3965C27.6738 29.3965 28.0723 29.3379 28.459 29.2207C28.8574 29.0918 29.1973 28.8926 29.4785 28.623C29.7715 28.3418 29.9648 27.9844 30.0586 27.5508ZM70.5234 6L65.8301 33H60.0469L64.7402 6H70.5234ZM66.9375 22.8398L65.6719 22.8926C65.7773 21.8379 66.0059 20.7598 66.3574 19.6582C66.7207 18.5566 67.2129 17.543 67.834 16.6172C68.4668 15.6914 69.2461 14.9531 70.1719 14.4023C71.0977 13.8398 72.1875 13.5762 73.4414 13.6113C74.543 13.6348 75.4512 13.8574 76.166 14.2793C76.8926 14.7012 77.4551 15.2695 77.8535 15.9844C78.2637 16.6875 78.5332 17.4902 78.6621 18.3926C78.791 19.2832 78.8027 20.2148 78.6973 21.1875L76.7285 33H70.9102L72.9141 21.1348C72.9727 20.5723 72.9609 20.0742 72.8789 19.6406C72.7969 19.1953 72.5977 18.8438 72.2812 18.5859C71.9766 18.3164 71.5137 18.1758 70.8926 18.1641C70.1895 18.1523 69.6035 18.2754 69.1348 18.5332C68.666 18.791 68.2852 19.1484 67.9922 19.6055C67.6992 20.0508 67.4707 20.5547 67.3066 21.1172C67.1543 21.6797 67.0312 22.2539 66.9375 22.8398ZM90.3516 28.2188L91.582 20.3086C91.6289 19.8867 91.623 19.4824 91.5645 19.0957C91.5176 18.709 91.3711 18.3926 91.125 18.1465C90.8906 17.8887 90.5215 17.7539 90.0176 17.7422C89.5605 17.7305 89.1738 17.8125 88.8574 17.9883C88.541 18.1641 88.2891 18.4102 88.1016 18.7266C87.9141 19.043 87.7793 19.4062 87.6973 19.8164L81.8965 19.8516C81.9434 18.75 82.2363 17.8008 82.7754 17.0039C83.3145 16.207 84.0059 15.5566 84.8496 15.0527C85.6934 14.5488 86.6133 14.1797 87.6094 13.9453C88.6172 13.7109 89.6074 13.6055 90.5801 13.6289C91.916 13.6523 93.123 13.9336 94.2012 14.4727C95.291 15 96.1289 15.7676 96.7148 16.7754C97.3125 17.7715 97.541 18.9844 97.4004 20.4141L96.1523 28.2188C96.0469 28.9219 95.9531 29.6719 95.8711 30.4688C95.7891 31.2539 95.9062 31.9863 96.2227 32.666L96.2051 33L90.5625 33.0176C90.3047 32.2559 90.1758 31.4648 90.1758 30.6445C90.1758 29.8242 90.2344 29.0156 90.3516 28.2188ZM92.2324 21.3809L91.7051 24.5449L89.4375 24.5273C88.9922 24.5391 88.5645 24.6152 88.1543 24.7559C87.7559 24.8848 87.3984 25.0723 87.082 25.3184C86.7656 25.5645 86.502 25.8691 86.291 26.2324C86.0918 26.5957 85.9629 27.0117 85.9043 27.4805C85.8574 27.7969 85.8809 28.084 85.9746 28.3418C86.0801 28.5879 86.2383 28.7871 86.4492 28.9395C86.6719 29.0918 86.9473 29.1738 87.2754 29.1855C87.7793 29.1973 88.2656 29.1035 88.7344 28.9043C89.2031 28.7051 89.6074 28.4238 89.9473 28.0605C90.2988 27.6973 90.5391 27.2754 90.668 26.7949L91.6875 29.2734C91.3828 29.8828 91.0312 30.4395 90.6328 30.9434C90.2461 31.4473 89.8066 31.8867 89.3145 32.2617C88.834 32.625 88.2949 32.9062 87.6973 33.1055C87.0996 33.3047 86.4375 33.3984 85.7109 33.3867C84.668 33.3633 83.707 33.1113 82.8281 32.6309C81.9492 32.1504 81.252 31.4941 80.7363 30.6621C80.2207 29.8301 79.9805 28.8691 80.0156 27.7793C80.0625 26.5137 80.373 25.4648 80.9473 24.6328C81.5215 23.8008 82.2656 23.1504 83.1797 22.6816C84.1055 22.2012 85.1074 21.8613 86.1855 21.6621C87.2754 21.4629 88.3535 21.3633 89.4199 21.3633L92.2324 21.3809ZM106.717 19.0078L104.291 33H98.5078L101.812 13.9805H107.191L106.717 19.0078ZM112.939 13.8223L112.184 19.3418C111.879 19.2949 111.574 19.2539 111.27 19.2188C110.965 19.1836 110.654 19.1602 110.338 19.1484C109.693 19.1367 109.107 19.2129 108.58 19.377C108.064 19.5293 107.613 19.7695 107.227 20.0977C106.852 20.4141 106.541 20.8125 106.295 21.293C106.049 21.7734 105.867 22.3301 105.75 22.9629L104.783 22.2598C104.9 21.3691 105.088 20.4258 105.346 19.4297C105.615 18.4219 105.99 17.4727 106.471 16.582C106.951 15.6914 107.572 14.9707 108.334 14.4199C109.096 13.8574 110.033 13.5762 111.146 13.5762C111.451 13.5762 111.75 13.5996 112.043 13.6465C112.336 13.6934 112.635 13.752 112.939 13.8223ZM125.648 13.9805L124.928 18.0938H113.783L114.504 13.9805H125.648ZM117.65 9.25195H123.434L120.41 26.8301C120.363 27.2402 120.363 27.5801 120.41 27.8496C120.457 28.1074 120.58 28.3066 120.779 28.4473C120.99 28.5762 121.312 28.6523 121.746 28.6758C121.992 28.6875 122.238 28.6816 122.484 28.6582C122.73 28.6348 122.977 28.6113 123.223 28.5879L122.818 32.877C122.314 33.041 121.799 33.1582 121.271 33.2285C120.756 33.2988 120.229 33.334 119.689 33.334C118.494 33.3105 117.492 33.0703 116.684 32.6133C115.887 32.1445 115.307 31.4824 114.943 30.627C114.592 29.7598 114.469 28.7285 114.574 27.5332L117.65 9.25195Z"
            fill="#0095DB"
          />
          <path
            d="M53.0156 24.3516L58.9043 24.2812C58.7402 26.2266 58.1133 27.8848 57.0234 29.2559C55.9453 30.6152 54.5801 31.6465 52.9277 32.3496C51.2871 33.0527 49.5352 33.3867 47.6719 33.3516C45.9023 33.3164 44.4141 32.9531 43.207 32.2617C42 31.5586 41.0508 30.6211 40.3594 29.4492C39.668 28.2656 39.2109 26.9414 38.9883 25.4766C38.7656 24 38.7539 22.4766 38.9531 20.9062L39.1465 19.5176C39.3809 17.8887 39.8145 16.3242 40.4473 14.8242C41.0801 13.3125 41.9062 11.9648 42.9258 10.7812C43.957 9.59766 45.1816 8.67188 46.5996 8.00391C48.0176 7.32422 49.623 7.00195 51.416 7.03711C53.3262 7.07227 54.9492 7.4707 56.2852 8.23242C57.6328 8.99414 58.6758 10.0605 59.4141 11.4316C60.1641 12.8027 60.5859 14.4199 60.6797 16.2832L54.6855 16.2656C54.7207 15.3633 54.6328 14.5898 54.4219 13.9453C54.2109 13.3008 53.8359 12.8027 53.2969 12.4512C52.7695 12.0879 52.0254 11.8887 51.0645 11.8535C50.0215 11.8184 49.1484 12.0352 48.4453 12.5039C47.7539 12.9609 47.1914 13.5762 46.7578 14.3496C46.3242 15.123 45.9902 15.9609 45.7559 16.8633C45.5332 17.7656 45.3633 18.6387 45.2461 19.4824L45.0703 20.9238C44.9883 21.6152 44.9121 22.3945 44.8418 23.2617C44.7715 24.1172 44.8008 24.9434 44.9297 25.7402C45.0586 26.5254 45.3574 27.1816 45.8262 27.709C46.2949 28.2363 47.0273 28.5176 48.0234 28.5527C48.9609 28.5762 49.7754 28.4297 50.4668 28.1133C51.1582 27.7852 51.7148 27.3047 52.1367 26.6719C52.5703 26.0273 52.8633 25.2539 53.0156 24.3516Z"
            fill="white"
          />
        </svg>
      </div>

      <form
        className="mt-8 space-y-4 max-w-sm w-full"
        onSubmit={handleSubmit(signUp)}
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="gap-2 -space-y-px flex flex-col">
          <div>
            <Input
              name="email"
              error={errors.email}
              placeholder="Seu E-mail"
              customClass="rounded-lg shadow-sm"
              {...register('email')}
            />
          </div>
          <div>
            <Input
              name="name"
              placeholder="Seu nome"
              error={errors.name}
              customClass="rounded-lg shadow-sm"
              {...register('name')}
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              error={errors.password}
              placeholder="Sua senha"
              customClass="rounded-lg shadow-sm"
              {...register('password')}
            />
          </div>
          <div>
            <Input
              name="confirm-password"
              type="password"
              error={errors.confirmPassword}
              placeholder="Confirme sua senha"
              customClass="rounded-lg shadow-sm"
              {...register('confirmPassword')}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="confirm-terms"
            name="confirm-terms"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            {...register('confirmTerms')}
          />
          <label
            htmlFor="confirm-terms"
            className={`${
              errors.confirmTerms ? 'text-red-600' : 'text-gray-900'
            } ml-2 flex text-sm  dark:text-slate-400`}
          >
            Concordo com os termos de uso
          </label>
        </div>

        <div>
          <Button isLoading={isSubmitting} type="submit">
            Criar conta
          </Button>
        </div>
      </form>
    </main>
  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});

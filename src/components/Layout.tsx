import { CircleNotch } from 'phosphor-react';
import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DisclosureProvider } from '../contexts/DisclosureContext';
import { Header } from './Header';
import { SignOutModal } from './Modals/SignOutModal';
import { NavigationMenu } from './NavigationMenu';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <CircleNotch
          className="animate-spin text-primary"
          size={32}
          weight="bold"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <DisclosureProvider>
        <div className="fixed top-0 px-4 left-0 w-full border-b border-gray-300 z-50 bg-neutral-200 dark:bg-slate-900">
          <Header />
          <SignOutModal />

          <NavigationMenu />
        </div>
      </DisclosureProvider>
      <main className="mt-40 mx-4 md:ml-6 flex flex-col w-full">
        {children}
      </main>
    </div>
  );
}

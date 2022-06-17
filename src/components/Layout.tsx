import { ReactNode } from 'react';
import { DisclosureProvider } from '../contexts/DisclosureContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <DisclosureProvider>
        <>
          <Sidebar />
          <Header />
        </>
      </DisclosureProvider>
      <main className="mt-16 ml-4 md:ml-6">{children}</main>
    </>
  );
}

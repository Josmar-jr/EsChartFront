import { List } from 'phosphor-react';
import { useDisclosure } from '../../contexts/DisclosureContext';
import { Menu } from './Menu';

export function Header() {
  const { onOpen } = useDisclosure();

  return (
    <header className="flex justify-between bg-neutral dark:bg-slate-900 border-b fixed top-0 left-0 border-slate-300 dark:border-slate-800 w-full py-2 px-4">
      <button
        onClick={onOpen}
        className="text-primary dark:text-secondary outline-none rounded-sm hover:brightness-95 focus:brightness-95 focus:ring"
      >
        <List size={26} />
      </button>
      <Menu />
    </header>
  );
}

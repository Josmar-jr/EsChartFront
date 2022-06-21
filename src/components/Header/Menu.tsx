import { useState } from 'react';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

import { Globe, Moon, SignOut, User } from 'phosphor-react';

import { useAuth } from '../../contexts/AuthContext';

import { Switch } from '../Form/Switch';
import { SignOutModal } from '../Modals/SignOutModal';
import { useDisclosure } from '../../contexts/DisclosureContext';

export function Menu() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { onOpenSignOutModal } = useDisclosure();

  const [isChecked, setIsChecked] = useState(theme === 'dark' && true);

  function handleChangeChecked() {
    setIsChecked(oldState => !oldState);
    setTheme(isChecked ? 'light' : 'dark');
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex w-9 h-9 outline-none drop-shadow-md focus:ring focus:secondary rounded-full">
        <Avatar.Root className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center bg-green-200">
          {user?.avatar ? (
            <Avatar.Image
              className="w-full rounded-full drop-shadow-md"
              src={user.avatar}
              alt="Avatar"
            />
          ) : (
            <Avatar.Fallback className="font-bold">
              {user?.name?.split('')[0]}
            </Avatar.Fallback>
          )}
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="border dark:bg-slate-900 dark:border-slate-800 outline-none border-slate-300 p-2 rounded-md shadow-lg mt-1 bg-neutral-200">
        <DropdownMenu.Group>
          <Link href="/">
            <a>
              <DropdownMenu.Item className="p-[4px] w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                <User size={20} weight="bold" />
                Meu perfil
              </DropdownMenu.Item>
            </a>
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.TriggerItem className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
              <Globe size={20} weight="bold" />
              Idioma
            </DropdownMenu.TriggerItem>

            <DropdownMenu.Content
              className="border dark:bg-slate-900 dark:border-slate-800 outline-none border-slate-300 p-2 rounded-md shadow-lg mt-1 bg-neutral-200"
              sideOffset={2}
              alignOffset={-5}
            >
              <DropdownMenu.Item className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                Português
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                Inglês
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                Inglês
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <button onClick={handleChangeChecked}>
            <DropdownMenu.Item
              itemRef="button"
              className="p-[4px] w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]"
            >
              <Moon size={20} weight="bold" />
              <Switch
                isChecked={isChecked}
                onChangeChecked={handleChangeChecked}
              />
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Group>
        <DropdownMenu.Separator className="border-b dark:border-slate-700 border-slate-300 my-1" />
        <DropdownMenu.Group>
          <button className="w-full" onClick={onOpenSignOutModal}>
            <DropdownMenu.Item className="p-[4px] w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
              <SignOut size={20} weight="bold" /> Terminar sessão
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

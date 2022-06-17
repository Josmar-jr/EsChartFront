import { useState } from 'react';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

import { Globe, Moon, SignOut, User } from 'phosphor-react';

import { useAuth } from '../../contexts/AuthContext';

import { Switch } from '../Form/Switch';

export function Menu() {
  const { theme, setTheme } = useTheme();
  const { signOut, user } = useAuth();

  const [isChecked, setIsChecked] = useState(theme === 'dark' && true);

  function handleChangeChecked() {
    setIsChecked(oldState => !oldState);
    setTheme(isChecked ? 'light' : 'dark');
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="w-9 outline-none focus:ring focus:secondary rounded-full">
        <Avatar.Root>
          <Avatar.Image
            className="w-full rounded-full"
            src={user.avatar}
            alt="Avatar"
          />
          <Avatar.Fallback />
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="border dark:bg-slate-900 dark:border-slate-800 outline-none border-slate-300 p-2 rounded-md shadow-lg mt-1 bg-neutral">
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
              className="border dark:bg-slate-900 dark:border-slate-800 outline-none border-slate-300 p-2 rounded-md shadow-lg mt-1 bg-neutral"
              sideOffset={2}
              alignOffset={-5}
            >
              <DropdownMenu.Item className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                Save Page As…
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-[4px] cursor-pointer w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
                Create Shortcut…
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
        <DropdownMenu.Separator className="border-b border-slate-300 my-1" />
        <DropdownMenu.Group>
          <button onClick={() => signOut()} className="w-full">
            <DropdownMenu.Item className="p-[4px] w-full flex gap-2 items-center rounded-sm outline-none focus:dark:bg-[rgba(253,252,252,0.1)] hover:dark:bg-[rgba(253,252,252,0.1)] focus:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]">
              <SignOut size={20} weight="bold" /> Terminar sessão
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

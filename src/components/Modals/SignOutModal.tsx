import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { SignIn, SignOut as IconSignOut } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDisclosure } from '../../contexts/DisclosureContext';

export function SignOutModal() {
  const { signOut } = useAuth();
  const { isOpenSignOutModal, onToggleSignOutModal } = useDisclosure();

  return (
    <AlertDialog.Root
      open={isOpenSignOutModal}
      onOpenChange={onToggleSignOutModal}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[rgba(0,0,0,0.7)] fixed top-0 flex justify-center items-center left-0 w-full h-full z-50">
          <AlertDialog.Content className="max-w-md bg-transparent w-full h-1/2 md:dark:bg-slate-900 md:bg-slate-200 z-[99] gap-4 rounded-md flex justify-center items-center flex-col relative m-auto">
            <AlertDialog.Title className="text-2xl font-bold text-center p-2 ">
              Quer mesmo sair? :/
            </AlertDialog.Title>
            <div className="flex items-center gap-2 justify-center">
              <AlertDialog.Cancel
                className="w-32 h-36 outline-none focus:brightness-95 focus:ring focus:secondary hover:opacity-80 transition-opacity flex flex-col 
                gap-2 justify-center items-center text-slate-100 dark:bg-secondary bg-primary rounded-md
                "
              >
                <SignIn size={42} weight="bold" className="drop-shadow-lg" />
                <strong>Noooo!</strong>
              </AlertDialog.Cancel>
              <AlertDialog.Action
                onClick={signOut}
                className="w-32 h-36 outline-none focus:brightness-95 focus:ring focus:secondary hover:opacity-80 transition-opacity flex flex-col gap-2 justify-center items-center text-slate-100 dark:bg-slate-800 bg-slate-400 rounded-md"
              >
                <IconSignOut
                  size={42}
                  weight="bold"
                  className="drop-shadow-lg"
                />
                <strong>Sair</strong>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

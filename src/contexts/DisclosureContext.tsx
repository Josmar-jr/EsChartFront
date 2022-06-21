import { createContext, ReactNode, useContext, useState } from 'react';

type DisclosureContextData = {
  isOpenSignOutModal: boolean;
  onOpenSignOutModal: () => void;
  onToggleSignOutModal: () => void;
};

interface DisclosureProviderProps {
  children: ReactNode;
}

const DisclosureContext = createContext({} as DisclosureContextData);

export function DisclosureProvider({ children }: DisclosureProviderProps) {
  const [isOpenSignOutModal, setIsOpenSignOutModal] = useState(false);

  function onOpenSignOutModal() {
    setIsOpenSignOutModal(true);
  }

  function onToggleSignOutModal() {
    setIsOpenSignOutModal(!isOpenSignOutModal);
  }

  return (
    <DisclosureContext.Provider
      value={{
        isOpenSignOutModal,
        onOpenSignOutModal,
        onToggleSignOutModal
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

export function useDisclosure() {
  const disclosure = useContext(DisclosureContext);

  return disclosure;
}

import { createContext, ReactNode, useContext, useState } from 'react';

type DisclosureContextData = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

interface DisclosureProviderProps {
  children: ReactNode;
}

const DisclosureContext = createContext({} as DisclosureContextData);

export function DisclosureProvider({ children }: DisclosureProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onToggle() {
    setIsOpen(oldState => !oldState);
  }

  return (
    <DisclosureContext.Provider value={{ isOpen, onOpen, onClose, onToggle }}>
      {children}
    </DisclosureContext.Provider>
  );
}

export function useDisclosure() {
  const disclosure = useContext(DisclosureContext);

  return disclosure;
}

import { useScreenSize } from '../../hooks/useWindowSize';
import { useDisclosure } from '../../contexts/DisclosureContext';

import { Sm } from './Sm';
import { Md } from './Md';

export function Sidebar() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const { screenSize } = useScreenSize();

  return screenSize === 'sm' ? (
    <Sm isOpen={isOpen} onClose={onClose} />
  ) : (
    <Md isOpen={isOpen} onToggle={onToggle} />
  );
}

import { ChartPieSlice, Gear, SquaresFour } from 'phosphor-react';
import { NavLink } from './NavLink';

interface NavSectionProps {
  isCompressSidebar: boolean;
}

export function NavSection({ isCompressSidebar }: NavSectionProps) {
  return (
    <nav className="mt-28">
      <strong className="text-xs ml-4 translate-y-[-10px] inline-block">
        {!isCompressSidebar && 'Menu'}
      </strong>
      <ul className="flex gap-5 flex-col text-slate-500 font-medium">
        <li className="">
          <NavLink href="/dashboard">
            <span className="flex items-center gap-2">
              <SquaresFour size={24} />
              {!isCompressSidebar && 'Dashboard'}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/2">
            <span className="flex items-center gap-2">
              <ChartPieSlice size={24} />
              {!isCompressSidebar && 'Chart'}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/algo">
            <span className="flex items-center gap-2">
              <Gear size={24} />
              {!isCompressSidebar && 'Settings'}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

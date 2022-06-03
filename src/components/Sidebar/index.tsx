import { ChartPieSlice, Gear, SquaresFour } from 'phosphor-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  return (
    <aside className="border border-red-600">
      <nav>
        <ul className="flex gap-5 flex-col text-slate-500 font-medium">
          <li>
            <a href="#" className="flex">
              <SquaresFour size={20} />
              Dashboard
            </a>
          </li>
          <li>
            <NavLink icon={<ChartPieSlice size={20} />} href="/dashboard">
              Statistics
            </NavLink>
          </li>
          <li>
            <a href="#" className="flex">
              <Gear size={20} />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

import {
  CaretDoubleRight,
  ChartPieSlice,
  Gear,
  SquaresFour
} from 'phosphor-react';
import { NavLink } from './NavLink';

interface MdProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Md({ isOpen, onToggle }: MdProps) {
  return (
    <aside
      className={`ease-linear z-50 duration-300 relative items-start flex flex-col h-screen ${
        isOpen ? 'w-12' : 'w-48'
      }`}
      role="menubar"
    >
      <div className="bg-neutral dark:bg-slate-900 w-full py-6 h-full border-slate-300 dark:border-slate-800 border-r">
        <div className="mx-auto flex items-center justify-center">
          <svg
            width="37"
            height="27"
            viewBox="0 0 37 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 26L18.8889 6H36L29.8889 26H14Z"
              fill="#034EA1"
              stroke="#034EA1"
            />
            <path
              d="M14 22.3086L13.3574 26H3.03516L3.67773 22.3086H14ZM8.17578 6.09375L4.7168 26H0.0410156L3.48633 6.09375H8.17578ZM14.1094 13.9961L13.4941 17.5645H4.49805L5.12695 13.9961H14.1094ZM16.8438 6.09375L16.2012 9.79883H5.83789L6.49414 6.09375H16.8438Z"
              fill="#0095DB"
            />
            <path
              d="M27.2891 19.2734L31.8691 19.2188C31.7415 20.7318 31.2539 22.0215 30.4062 23.0879C29.5677 24.1452 28.5059 24.9473 27.2207 25.4941C25.9447 26.041 24.582 26.3008 23.1328 26.2734C21.7565 26.2461 20.599 25.9635 19.6602 25.4258C18.7214 24.8789 17.9831 24.1497 17.4453 23.2383C16.9076 22.3177 16.5521 21.2878 16.3789 20.1484C16.2057 19 16.1966 17.8151 16.3516 16.5938L16.502 15.5137C16.6842 14.2467 17.0215 13.0299 17.5137 11.8633C18.0059 10.6875 18.6484 9.63932 19.4414 8.71875C20.2435 7.79818 21.196 7.07812 22.2988 6.55859C23.4017 6.02995 24.6504 5.7793 26.0449 5.80664C27.5306 5.83398 28.793 6.14388 29.832 6.73633C30.8802 7.32878 31.6914 8.1582 32.2656 9.22461C32.849 10.291 33.1771 11.5488 33.25 12.998L28.5879 12.9844C28.6152 12.2826 28.5469 11.681 28.3828 11.1797C28.2188 10.6784 27.9271 10.291 27.5078 10.0176C27.0977 9.73503 26.5189 9.58008 25.7715 9.55273C24.9603 9.52539 24.2812 9.69401 23.7344 10.0586C23.1966 10.4141 22.7591 10.8926 22.4219 11.4941C22.0846 12.0957 21.8249 12.7474 21.6426 13.4492C21.4694 14.151 21.3372 14.8301 21.2461 15.4863L21.1094 16.6074C21.0456 17.1452 20.9863 17.7513 20.9316 18.4258C20.877 19.0911 20.8997 19.7337 21 20.3535C21.1003 20.9642 21.3327 21.4746 21.6973 21.8848C22.0618 22.2949 22.6315 22.5137 23.4062 22.541C24.1354 22.5592 24.7689 22.4453 25.3066 22.1992C25.8444 21.944 26.2773 21.5703 26.6055 21.0781C26.9427 20.5768 27.1706 19.9753 27.2891 19.2734Z"
              fill="white"
            />
          </svg>
        </div>

        <button
          onClick={onToggle}
          className={`w-8 h-8 hover:brightness-95 ease-linear dark:border dark:bg-slate-900 dark:border-slate-700 outline-none focus:brightness-95 focus:ring focus:secondary duration-300 absolute bg-neutral top-16 left-[174px] ${
            isOpen && 'translate-x-[-144px]'
          } ${
            !isOpen && 'rotate-180'
          } drop-shadow-md rounded-full flex items-center justify-center`}
          role="button"
        >
          <CaretDoubleRight size={16} weight="bold" />
        </button>

        <nav className="mt-28">
          <strong className="text-xs ml-4 translate-y-[-10px] inline-block">
            {!isOpen && 'Menu'}
          </strong>
          <ul className="flex gap-5 flex-col text-slate-500 font-medium">
            <li>
              <NavLink href="/dashboard">
                <span className="flex items-center gap-2">
                  <SquaresFour size={24} />
                  {!isOpen && 'Dashboard'}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/2">
                <span className="flex items-center gap-2">
                  <ChartPieSlice size={24} />
                  {!isOpen && 'Chart'}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink href="/algo">
                <span className="flex items-center gap-2">
                  <Gear size={24} />
                  {!isOpen && 'Settings'}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

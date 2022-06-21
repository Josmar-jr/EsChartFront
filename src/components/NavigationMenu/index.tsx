import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';

export function NavigationMenu() {
  return (
    <NavMenuPrimitive.Root className="max-w-7xl mx-auto flex relative w-full pb-2">
      <NavMenuPrimitive.List className="flex justify-center items-center">
        <NavMenuPrimitive.Item>
          <NavMenuPrimitive.Trigger />
          <NavMenuPrimitive.Content>
            <NavMenuPrimitive.Link />
          </NavMenuPrimitive.Content>
        </NavMenuPrimitive.Item>

        <NavMenuPrimitive.Item>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavMenuPrimitive.Item>
        <NavMenuPrimitive.Item>
          <NavLink href="/register">Register</NavLink>
        </NavMenuPrimitive.Item>
        <NavMenuPrimitive.Item>
          <NavLink href="/me/as">Settings</NavLink>
        </NavMenuPrimitive.Item>
      </NavMenuPrimitive.List>

      <NavMenuPrimitive.Viewport />
    </NavMenuPrimitive.Root>
  );
}

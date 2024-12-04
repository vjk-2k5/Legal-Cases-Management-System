'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import withAuth from '@/app/hoc/withAuth';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import { User } from '@nextui-org/user';
import { useState ,useEffect } from "react";


const clientNavbar = () => {

  const [role, setRole] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name'); 
    if (storedRole) setRole(storedRole);
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('client_id');
    window.location.href = '/login';
  };


  return (
    <NextUINavbar maxWidth="full" className="w-full" position="sticky">
      <NavbarContent className="basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/team/dashboard">
            <Logo />
            <p className="font-bold text-inherit">Client</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <NextLink
              className={clsx(linkStyles({ color: 'foreground' }))}
              color="foreground"
              href="/clients/dashboard"
            >
              Dashboard
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(linkStyles({ color: 'foreground' }))}
              color="foreground"
              href="/clients/cases"
            >
              Cases
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(linkStyles({ color: 'foreground' }))}
              color="foreground"
              href="/clients/appointments"
            >
              Appointments
            </NextLink>
          </NavbarItem>
          <NavbarItem>
        <NextLink
            className={clsx(linkStyles({ color: 'foreground' }))}
            color="foreground"
            href="/clients/contact"
            >
            Contact
        </NextLink>
      </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <User name={name} description={role} />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button auto flat onClick={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link color="foreground" href="/clients/dashboard">
              Dashboard
            </Link>
          </NavbarMenuItem>
            <NavbarMenuItem>
                <Link color="foreground" href="/clients/cases">
                Cases
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link color="foreground" href="/clients/appointments">
                Appointments
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link color="foreground" href="/clients/contact">
                Contact
                </Link>
            </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default withAuth(clientNavbar);
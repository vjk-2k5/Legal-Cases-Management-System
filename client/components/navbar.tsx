import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  Logo,
} from "@/components/icons";
import { User } from "@nextui-org/user";

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="full"
      className="w-full"
      position="sticky"
    >
      <NavbarContent className="basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/home">
            <Logo />
            <p className="font-bold text-inherit">Resume Analyser</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <NextLink
              className={clsx(linkStyles({ color: "foreground" }))}
              color="foreground"
              href="/home"
            >
              Home
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(linkStyles({ color: "foreground" }))}
              color="foreground"
              href="/settings"
            >
              Settings
            </NextLink>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <User      
            name="John Doe"
            description="lawyer"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/home"
            >
              Home
            </Link>
          </NavbarMenuItem>
          
          <NavbarMenuItem>
            <Link
              color="foreground"
 href="/settings"
            >
              Settings
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
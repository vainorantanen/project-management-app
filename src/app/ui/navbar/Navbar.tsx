"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { RiArrowDownSLine } from "react-icons/ri";
import { Button as ShadButton } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaUser } from "react-icons/fa";
import React from "react";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import SignOutButton from "../SignOutButton";

export default function Navbar() {

  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-white border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center mr-1">
          <button className="text-black text-2xl font-bold hover:underline">
            <Link href="/">Proju</Link>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4">
              <NavigationButtons />
          {!session && (
            <ShadButton>
            <Link href="/login">Kirjaudu</Link>
          </ShadButton>
          )}
          {session ? (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <ShadButton>
                    <p>Oma tili</p>
                    <RiArrowDownSLine />
                  </ShadButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Oma tili</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <Link href={`/profiili`} className="flex">
                <FaUser className="mr-2 h-4 w-4" />
                <span>Profiili</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu className="mx-2" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Proju</SheetTitle>
        </SheetHeader>
        <div>
        {!session && (
            <ShadButton>
            <Link href="/login">Kirjaudu sisään</Link>
          </ShadButton>
          )}
        {session && (
          <div className="flex flex-col gap-2">
            <ShadButton>
        <Link href={`/profiili`} className="flex">
          <FaUser className="mr-2 h-4 w-4" />
          <span>Profiili</span>
        </Link>
        </ShadButton>
        <SignOutButton />
            </div>
        )}
        <NavigationButtonsSheet />
        </div>
      </SheetContent>
    </Sheet>
      </div>

    </nav>
  );
}

const linkStyling = "flex hover:text-blue-500 hover:bg-accent rounded-md p-2 text-sm"

function NavigationButtons() {
  return (
    <div className="flex gap-3 justify-center">

        <NavigationMenu>
  <NavigationMenuList>
  <NavigationMenuItem>
      <NavigationMenuTrigger>Muuta</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:max-w-[500px]">
        <ListItem
        href="/hinnasto">
          Hinnasto
        </ListItem>
        <ListItem
        href="/artikkelit">
          Blogi
        </ListItem>
        <ListItem
        href="/mobiilisovellus">
          Mobiilisovellus
        </ListItem>
        </ul>
        
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

        <ShadButton>
        <Link href="/workspaces">Työtilat</Link>
        </ShadButton>
    </div>
  )
}

function NavigationButtonsSheet() {
  return (
    <div className="flex flex-col flex-wrap gap-3 justify-center my-4">
        <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Muuta</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="grid w-full gap-3 p-4 md:max-w-[500px]">
        <ListItem
        href="/hinnasto">
          Hinnasto
        </ListItem>
        <ListItem
        href="/artikkelit">
          Blogi
        </ListItem>
        <ListItem
        href="/mobiilisovellus">
          Mobiilisovellus
        </ListItem>
        </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

        <ShadButton>
        <Link href="/workspaces">Työtilat</Link>
        </ShadButton>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
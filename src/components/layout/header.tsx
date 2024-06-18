'use client';

import React from 'react';

import Link from 'next/link';
import { PanelLeft, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { menuList } from '@/utils/menu';
import { getIcon } from '@/utils/get-icons';
import authService from '@/services/auth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  async function onClick() {
    await authService.logout();
    await router.push('/login');
  }

  return (
    <header className="sticky top-0 z-30 flex w-full h-14 items-center gap-4 border-b sm:static sm:h-auto border-0 bg-transparent p-4">
      <div className="flex w-full justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" size="icon" variant="outline">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xs" side="left">
            <nav className="grid gap-6 text-lg font-medium">
              {menuList.map((menu, index) => {
                return (
                  <Link
                    key={`${menu.name}-${index}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={menu.path}
                  >
                    {getIcon(menu.name)}
                    <span>{menu.name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="icon" variant="outline">
              <User className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onClick()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

'use client';

import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { menuList } from '@/utils/menu';
import { getIcon } from '@/utils/get-icons';
import { usePathname } from 'next/navigation';

const Aside = () => {
  const pathname = usePathname();
  const [subMenu, setSubMenu] = useState<string>('Home');

  function activeMenu(path: string) {
    return path === pathname;
  }

  function activeSubMenu(path: string) {
    return pathname === path;
  }

  function activeGroupMenu(menu: string) {
    return menu === subMenu;
  }

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="">Assignment Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuList.map((menu, index) => {
              return (
                <Fragment key={index}>
                  <Link
                    key={`${menu.name}-${index}`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 
                      ${activeMenu(menu.path) ? 'text-black' : 'text-gray-500'}
                      `}
                    href={menu.path}
                    onClick={() => setSubMenu(`${menu.name}`)}
                  >
                    {getIcon(menu.name)}
                    <span>{menu.name}</span>
                  </Link>
                </Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Aside;

'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';
import { AlignJustify, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import AuthBtns from '@/components/AuthBtns';
const Links = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 2,
    name: 'Colection',
    href: '/colection',
  },
  {
    id: 3,
    name: 'Categories',
    href: '/categories',
  },
  {
    id: 4,
    name: 'Contacts',
    href: '/contacts',
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <header className="container my-0 mx-auto p-4 flex gap-4 justify-between items-center">
      <Link href="/">
        <span className="font-bold hover:underline uppercase">Dresscode</span>
      </Link>
      <nav className="ml-auto flex">
        <ul
          className={cn(
            'flex gap-2 max-sm:hidden max-sm:fixed max-sm:w-screen max-sm:h-screen max-sm:left-0 max-sm:flex-col max-sm:top-0 z-10 max-sm:pt-14',
            visible ? 'max-sm:flex' : 'max-sm:hidden',
            theme === 'dark' ? 'max-sm:bg-black' : 'max-sm:bg-white',
          )}>
          {Links.map((link) => (
            <li
              key={link.id}
              className={cn(
                'hover:text-gray-500  max-sm:p-5',
                pathname === link.href ? 'text-gray-500' : '',
              )}>
              <Link href={link.href}>{link.name}</Link>
              <hr className={cn(pathname === link.href ? 'block' : 'hidden')} />
            </li>
          ))}
          <li className="hidden max-sm:block absolute right-5 top-5">
            <X className="cursor-pointer hidden max-sm:block" onClick={() => setVisible(false)} />
          </li>
        </ul>
        <AlignJustify
          className="cursor-pointer hidden max-sm:block"
          onClick={() => setVisible(!visible)}
        />
      </nav>
      <ModeToggle />
      <AuthBtns />
    </header>
  );
};

export default NavBar;

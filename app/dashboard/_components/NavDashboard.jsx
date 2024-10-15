'use client';
import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, LayoutList, List, ShoppingCart } from 'lucide-react';
const DashLinks = [
  {
    id: 1,
    href: '/dashboard',
    name: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    href: '/dashboard/products',
    name: 'Products',
    icon: <LayoutList />,
  },
  {
    id: 3,
    href: '/dashboard/categories',
    name: 'Categories',
    icon: <List />,
  },
  {
    id: 1,
    href: '/dashboard/orders',
    name: 'Orders',
    icon: <ShoppingCart />,
  },
];
export const NavDashboard = () => {
  const pathname = usePathname();

  return (
    <nav className="basis-1/6 max-sm:basis-auto">
      <ul className="flex flex-col gap-4">
        {DashLinks.map((link) => (
          <li key={link.name + '_' + link.id}>
            <Link
              href={link.href}
              className={cn(
                'inline-flex gap-2 hover:text-gray-500  max-sm:p-5',
                pathname === link.href ? 'text-gray-500' : '',
              )}>
              {link.icon}
              <span className="max-sm:hidden">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';
import { AlignJustify, ShoppingBasket, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import AuthBtns from '@/components/AuthBtns';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookiesHeader } from '@/app/actions';
import { reset, userMe } from '@/features/slices/userSlice';
import { Button } from './ui/button';

const Links = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Collection', href: '/collection' },
  { id: 3, name: 'Contacts', href: '/contacts' },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const me = useSelector((state) => state.users?.me);
  const { totalQuantity } = useSelector((state) => state.cart);
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const handleClick = async () => {
    try {
      dispatch(reset());
      await deleteCookiesHeader(); // Consider making deleteCookiesHeader return a promise if it doesn't already
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error if needed
    }
  };

  const ulStyle = cn(
    'flex gap-2 max-sm:hidden max-sm:fixed max-sm:w-screen max-sm:h-screen max-sm:left-0 max-sm:flex-col max-sm:top-0 max-sm:pt-14 z-20',
    visible ? 'max-sm:flex' : 'max-sm:hidden',
    resolvedTheme === 'dark' ? 'max-sm:bg-black' : 'max-sm:bg-white',
  );

  useEffect(() => {
    dispatch(userMe()); // Fetch user data on component mount
  }, [dispatch]);

  return (
    <header className="container my-0 mx-auto p-4 flex gap-4 justify-between items-center">
      <Link href="/">
        <span className="font-bold hover:underline uppercase">Dresscode</span>
      </Link>
      <nav className="ml-auto flex">
        <ul className={ulStyle}>
          {Links.map((link) => (
            <li
              key={link.id}
              className={cn(
                'hover:text-gray-500 max-sm:p-5',
                pathname === link.href ? 'text-gray-500' : '',
              )}>
              <Link href={link.href}>{link.name}</Link>
              <hr className={cn(pathname === link.href ? 'block' : 'hidden')} />
            </li>
          ))}
          <li className="hidden max-sm:block absolute right-5 top-5">
            <X className="cursor-pointer" onClick={() => setVisible(false)} />
          </li>
        </ul>
        <AlignJustify
          className="cursor-pointer hidden max-sm:block"
          onClick={() => setVisible(!visible)}
        />
      </nav>
      <Button
        className="relative"
        variant="outline"
        size="icon"
        onClick={() => router.push('/cart')}>
        <ShoppingBasket />
        <span className="absolute -translate-x-1/2 left-1/2 -top-2">{totalQuantity}</span>
      </Button>
      <ModeToggle />
      <AuthBtns handleClick={handleClick} me={me} />
    </header>
  );
};

export default NavBar;

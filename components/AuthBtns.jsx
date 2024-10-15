'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AuthBtns = ({ handleClick, me }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(me);
  }, [me]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!data ? (
          <>
            <DropdownMenuItem>
              <Link href={'/signin'}>Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/register'}>Register</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href={'/dashboard'}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
              Log Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthBtns;

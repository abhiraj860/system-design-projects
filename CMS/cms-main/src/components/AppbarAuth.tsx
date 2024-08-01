'use client';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  const session = useSession();

  return (
    !session?.data?.user && (
      <Button
        size={'sm'}
        variant={isInMenu ? 'navLink' : 'outline'}
        id="navbar-default"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </Button>
    )
  );
};

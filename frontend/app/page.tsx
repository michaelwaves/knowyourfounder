'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStytchMember } from '@stytch/nextjs/b2b';
import Authenticate from './components/Authenticate';

export default function AuthenticatePage() {
  const { member, isInitialized } = useStytchMember();
  const router = useRouter();

  // If the Stytch SDK no longer has a User then redirect to login; for example after logging out.
  useEffect(() => {
    if (isInitialized && member) {
      router.replace('/dashboard');
    }
  }, [member, isInitialized, router]);

  return <Authenticate />;
}
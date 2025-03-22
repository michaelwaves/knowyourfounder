'use client';

import { useStytchMemberSession } from '@stytch/nextjs/b2b';
import { useRouter, useSearchParams } from 'next/navigation';
import { StytchB2B } from '@stytch/nextjs/b2b';
import { discoveryConfig } from '@/lib/stytch/stytchConfig';

const Authenticate = () => {
    const { session } = useStytchMemberSession();
    const router = useRouter();
    const searchParams = useSearchParams(); // Handle query parameters

    const nextRoute = searchParams.get('next_route') || '/dashboard';

    // Redirect if the session exists
    if (session) {
        router.push(nextRoute);
        return null; // Return nothing since redirection happens
    }

    // Preserve existing query parameters and add next_route if exists
    const redirectParams = new URLSearchParams();
    searchParams.forEach((value, key) => redirectParams.set(key, value)); // Preserve current query params
    if (!redirectParams.has('next_route')) {
        redirectParams.set('next_route', nextRoute);
    }

    const fullRedirectURL = `${window.location.origin}/authenticate?${redirectParams.toString()}`;
    console.log(fullRedirectURL)
    const configWithRedirect = {
        ...discoveryConfig,
        emailMagicLinksOptions: {
            discoveryRedirectURL: fullRedirectURL,
        },
        oauthOptions: {
            ...discoveryConfig.oauthOptions,
            discoveryRedirectURL: fullRedirectURL,
        },
    };

    return (
        <div className="flex w-full h-full items-center justify-center">
            <StytchB2B config={configWithRedirect} />
        </div>
    );
};

export default Authenticate
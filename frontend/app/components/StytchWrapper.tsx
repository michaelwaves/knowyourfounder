"use client"
import { StytchB2BProvider } from "@stytch/nextjs/b2b";
import { createStytchB2BUIClient } from "@stytch/nextjs/b2b/ui";

const publicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
if (!publicToken) {
    throw new Error("Env variable NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN not set")
}
const stytchClient = createStytchB2BUIClient(
    publicToken
);

function StytchWrapper({ children }: { children: React.ReactNode }) {
    return (
        <StytchB2BProvider stytch={stytchClient}>
            {children}
        </StytchB2BProvider>
    );
}

export default StytchWrapper;
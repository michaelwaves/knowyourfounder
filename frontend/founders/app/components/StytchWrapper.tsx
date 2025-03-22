"use client"
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";

const publicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
if (!publicToken) {
    throw new Error("Env variable NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN not set")
}
const stytchClient = createStytchUIClient(
    publicToken
);

function StytchWrapper({ children }: { children: React.ReactNode }) {
    return (
        <StytchProvider stytch={stytchClient}>
            {children}
        </StytchProvider>
    );
}

export default StytchWrapper;
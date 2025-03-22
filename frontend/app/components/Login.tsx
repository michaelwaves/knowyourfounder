"use client"
// src/components/LoginOrSignupDiscoveryForm.jsx
import { StytchB2B } from '@stytch/nextjs/b2b';
import { AuthFlowType, B2BProducts } from '@stytch/vanilla-js/b2b';

const Login = () => {
    const config = {
        products: [B2BProducts.emailMagicLinks],
        sessionOptions: { sessionDurationMinutes: 60 },
        authFlowType: AuthFlowType.Discovery,
    };

    return <StytchB2B config={config} />;
};

export default Login
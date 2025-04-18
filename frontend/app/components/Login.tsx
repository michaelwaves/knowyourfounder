import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";

const REDIRECT_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/authenticate`;
function Login() {
    const styles = {
        container: {
            width: "100%",
        },
        buttons: {
            primary: {
                backgroundColor: "#45884b",
                borderColor: "#d5f5d9",
            },
        },
    };

    const config = {
        products: [Products.emailMagicLinks],
        emailMagicLinksOptions: {
            loginRedirectURL: REDIRECT_URL,
            loginExpirationMinutes: 60,
            signupRedirectURL: REDIRECT_URL,
            signupExpirationMinutes: 60,
        },
    };

    return (
        <StytchLogin config={config} styles={styles} />
    );
}

export default Login;
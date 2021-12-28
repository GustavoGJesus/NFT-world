import { useMoralis } from "react-moralis";

import styles from './styles.module.scss'; 

import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
    const { authenticate, isAuthenticated, logout} = useMoralis();
    
    return (
        <>
            {isAuthenticated ? (
                <button 
                className={styles.signInButton}
                onClick={logout} >
                <img src="/images/metamask.svg" />
                Logout
                <FiX color="#737380" className={styles.closeIcon}/>
                </button>
            ) : (
                <button
                className={styles.signInButton}
                onClick={() => {
                    authenticate({ provider: "Metamask" });
                }}
                >
                Connect Wallet Metamask
                </button>
            )}
        </>
    );
}
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header(){
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.png" alt="nft world" />
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Information</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}
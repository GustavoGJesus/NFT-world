import { SignInButton } from '../SignInButton';
import  Link  from 'next/link';

import styles from './styles.module.scss';

export function Header(){
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/" prefetch>
                    <img src="/images/logo.png" alt="nft world" />
                </Link>
                <nav>
                    <Link href="/" prefetch>
                        <a>Home</a>
                    </Link>
                    <Link  href="/projectsNft" prefetch>
                        <a>Projects</a>
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}
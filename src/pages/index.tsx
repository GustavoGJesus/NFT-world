import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | NFT world</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Welcome to the</span>
          <h1><span>NFT</span> world</h1>
          <p>
            Get access to information about the best NFT projects in 2022 
            <span> for $10.00 month</span>.
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/planet.png" alt="" />
      </main>
    </>
  )
}

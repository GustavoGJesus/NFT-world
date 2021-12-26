import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss'
import { stripe } from '../services/stripe';

interface HomeProps{
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }) {
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
            <span> for {product.amount} month</span>.
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/planet.png" alt="" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KB027JHSTb4hNh8S4jwpuf5')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  return{
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';

import { motion } from 'framer-motion';
import styles from './home.module.scss';
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
          <motion.div initial="hidden" animate="visible" variants={{
            hidden:{
              scale: .8,
              opacity: 0
            },
            visible:{
              scale: 1,
              opacity: 1,
              transition:{
                delay: .6
              }
            }
          }}> 
            <span>Welcome to the</span>
            <h1><span>NFT</span> world</h1>
            <p>
              Get access to information about the best NFT projects in 2022 
              <span> for {product.amount} month</span>.
            </p>
          <SubscribeButton priceId={product.priceId}/>
          </motion.div>
        </section>
        <motion.div animate={{
          x: 80,
          opacity: 1
        }}
        initial={{
          opacity: 0.1
        }} 
        transition={{
          type: "spring",
          stiffness: 10
        }}
        >
          <img src="/images/planet.png" alt="" />
        </motion.div>
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

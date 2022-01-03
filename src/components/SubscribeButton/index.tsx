import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import motion from 'framer-motion';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId } : SubscribeButtonProps){
    
    async function handleSubscribe(){
        try{
            const response = await api.post('/subscribe') 

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId});
        } catch(err){
            alert(err.message);
        }
    }

    return(
        <button type="button" 
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}
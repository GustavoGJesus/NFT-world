import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST'){
        

        const checkoutSession = await stripe.checkout.sessions.create({
            
            payment_method_types:['card'],
            billing_address_collection: 'required',
            line_items: [
                {price: 'price_1KB027JHSTb4hNh8S4jwpuf5', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId : checkoutSession.id})
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed');
    }
}
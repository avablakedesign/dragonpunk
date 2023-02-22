import type { NextApiRequest, NextApiResponse } from 'next'
// import { Stripe, loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
// const stripe = loadStripe(process.env.STRIPE_PKEY!);
const stripe = new Stripe(process.env.STRIPE_ACCESS_KEY!, {
  apiVersion: "2022-11-15"
})

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      console.log("CHECKOUTBODY", req.body);
      const stripeProduct = await stripe.products.list();
      // console.log(stripeProduct);
      const line_items = req.body.map((item: any) => {
        const price = stripeProduct.data.find((product)=>{
          return product.id === item.stripe_product_id;
        })
        console.log("PRICE", price);
        return {
          price: price?.default_price,
          // price: stripeProduct.data.find((product: any) => {
          //   return product.id === item.stripe_product_id;
          // }).default_price_data,
          quantity: 1
        }
      })
      console.log("LINE_ITEMS", line_items);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ session_url: session.url })
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// interface Data {
//   test: string;
// }

// // Create Checkout Sessions from body params.
// const params: Stripe.Checkout.SessionCreateParams = {
//   submit_type: 'donate',
//   payment_method_types: ['card'],
//   line_items: [
//     {
//       name: 'Custom amount donation',
//       amount: formatAmountForStripe(amount, CURRENCY),
//       currency: CURRENCY,
//       quantity: 1,
//     },
//   ],
//   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
// };
// const checkoutSession: Stripe.Checkout.Session =
//   await stripe.checkout.sessions.create(params);



// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ test: 'John Doe' })
// }

import { Request, Response } from 'express';
import Stripe from 'stripe';
import CharityItem from '../models/CharityItem';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createItemSession = async (req: Request, res: Response) => {
  const { itemId, shipping } = req.body;

  try {
    const item = await CharityItem.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Charity item not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'huf',
            product_data: {
              name: item.name,
              images: [item.imageUrl],
            },
            unit_amount: item.price * 100, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/canceled`,
      shipping_address_collection: { allowed_countries: ['HU'] }, 
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, 
              currency: 'huf',
            },
            display_name: 'Szállítás',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      metadata: { itemId: item._id.toString() },
    });

    res.status(200).json({ sessionUrl: session.url });
  } catch (error: any) {
    console.error('Error creating item checkout session:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createDonationSession = async (req: Request, res: Response) => {
  const { amountFt } = req.body;

  if (typeof amountFt !== 'number' || amountFt <= 0) {
    return res.status(400).json({ message: 'Invalid donation amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'huf', 
            product_data: {
              name: 'Állatmenhely Támogatás',
            },
            unit_amount: amountFt * 100, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/canceled`,
      metadata: { donationAmount: amountFt },
    });

    res.status(200).json({ sessionUrl: session.url });
  } catch (error: any) {
    console.error('Error creating donation checkout session:', error);
    res.status(500).json({ message: error.message });
  }
};

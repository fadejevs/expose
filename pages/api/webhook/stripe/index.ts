import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../app/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const event = req.body;

  // Initialize customerEmail variable
  let customerEmail: string | null = null;

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      // For payment_intent.succeeded, the email might be on the PaymentIntent object (depending on your Stripe setup)
      const paymentIntent = event.data.object as import('stripe').Stripe.PaymentIntent;
      customerEmail = paymentIntent.receipt_email;
      break;
    case 'checkout.session.completed':
      // For checkout.session.completed, the email is in the checkout session object
      const session = event.data.object as import('stripe').Stripe.Checkout.Session;
      customerEmail = session.customer_email || session.customer_details?.email || null;
      break;
    // Add other event types as needed
  }

  // Check if customerEmail is null or undefined
  if (!customerEmail) {
    console.error('No email provided for event:', event.id);
    res.status(400).send('No email provided for event');
    return;
  }

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', customerEmail)
      .single();

    if (userError || !user) {
      console.error('User not found for email:', customerEmail);
      res.status(404).send('User not found');
      return;
    }

    // Update the user's lifetimeAccess to true
    const { error: updateError } = await supabase
      .from('users')
      .update({ lifetime_access: true })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user:', updateError);
      res.status(500).send(`Error updating user: ${updateError.message}`);
      return;
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error updating user:', error.message);
    res.status(500).send(`Error updating user: ${error.message}`);
  }
}
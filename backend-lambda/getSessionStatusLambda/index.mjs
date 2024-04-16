import stripe from 'stripe';

export const handler = async (event) => {
  const { session_id } = event.queryStringParameters;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  try {
    // Initialize the Stripe client
    const stripeClient = stripe(stripeSecretKey);

    // Retrieve session status from Stripe
    const session = await stripeClient.checkout.sessions.retrieve(session_id);

    // Send response with session status and customer email
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: session.status,
        customer_email: session.customer_details.email
      })
    };
  } catch (error) {
    // Handle errors
    console.error('Error retrieving session status:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error retrieving session status' })
    };
  }
};

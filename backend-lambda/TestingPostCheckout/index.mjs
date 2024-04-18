import { MongoClient, ServerApiVersion } from "mongodb";
import stripe from 'stripe';

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event));
  if (!event.headers || !event.headers.Authorization) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization header is missing' }),
    };
  }

  // Extract the MongoDB URI from environment variables
  const uri = process.env.MONGO_URI;
  // Extract the Stripe secret key from environment variables
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  const YOUR_DOMAIN = 'https://easyshopper.ca';

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect to the MongoDB database
    await client.connect();

    // Fetch cart data and wait for it to resolve
    const lineItems = await fetchCartData(event.headers.Authorization.replace('Bearer ', ''));

    // Create a checkout session with the fetched line items
    const session = await stripe(stripeSecretKey).checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });

    // Send the client secret to the frontend
    //return { clientSecret: session.client_secret };

    return {
      statusCode: 200,
      body: JSON.stringify({clientSecret: session.client_secret}),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating checkout session' }),
    };
  } finally {
    // Close the MongoDB connection after performing operations
    await client.close();
  }
};

const fetchCartData = async (accessToken) => {
  console.log('Access token at fetchCartData: ' + accessToken);
  try {
      const response = await fetch('https://easyshopper.ca/api/cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log('Response from fetchCartData: ' + JSON.stringify(response));

      const cartData = await response.json();
      console.log('Cart json being fetched: ' + JSON.stringify(cartData));

      const lineItems = await Promise.all(cartData.cart.map(async (item) => {
        const productInfo = await fetchProductInfo(item.productId);
        console.log(productInfo);
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: productInfo?.name || 'Product name not found',
              images: [productInfo?.images[0] || 'Product image not found'],                
            },
            unit_amount: Math.round((productInfo?.price || 0) * 100),
          },
          quantity: item.quantity,
        };
      }));
  
      return lineItems;

  } catch (error) {
      console.error('Error fetching cart data: ', error);
      throw error;
  }
};

const fetchProductInfo = async (productId) => {
  try {
      const response = fetch(`https://easyshopper.ca/api/products/${productId}`);
      const productData = (await response).json();
      console.log('Product info json being fetched fetchProductInfo lamdba: ' + JSON.stringify(productData));

      // return json data
      return productData;
  } catch (error) {
      console.error('Error while attempting to fetch product info: ', error);
      return null;
  }
};

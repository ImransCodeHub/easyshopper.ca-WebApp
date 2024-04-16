import stripe from 'stripe';
import express from 'express';
import cors from 'cors';
import client from './mongo.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.static('public'));
app.use(cors());

const JWTSecret = "test123";


const YOUR_DOMAIN = 'http://localhost:3000';

const fetchProductInfo = async (productId) => {
  try {
      // const response = fetch(`/api/products/${productId}`);
      const response = fetch(`http://localhost:8000/api/products/${productId}`);
      const productData = (await response).json();
      console.log('Product info json being fetched: ' + JSON.stringify(productData));

      // return json data
      return productData;
  } catch (error) {
      console.error('Error while attempting to fetch product info: ', error);
      return null;
  }
};

const fetchCartData = async (accessToken) => {
  try {
      // const response = await fetch('/api/cart', { 
      const response = await fetch('http://localhost:8000/api/cart', { 
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
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

app.post('/create-checkout-session', async (req, res) => {
  try {
    // Fetch cart data and wait for it to resolve
    const lineItems = await fetchCartData(req.headers.authorization.replace('Bearer ', ''));

    // Create a checkout session with the fetched line items
    // Put the secret key in the .env file and use process.env.STRIPE_SECRET_KEY
    const session = await stripe('sk_test_51P3xQp04W06RgWe1Yg7cNlHtZubkL5jHRzSWotY3QCAWbXMqm8eiy9r1bru824U6ebeIyEWSguqxbcdPeoSHL4ct00sFyp7htZ').checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });

    // Send the client secret to the frontend
    res.send({clientSecret: session.client_secret});

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Error creating checkout session');
  }
});

// Use .env file to store the secret key
app.get('/session-status', async (req, res) => {
  const session = await stripe('sk_test_51P3xQp04W06RgWe1Yg7cNlHtZubkL5jHRzSWotY3QCAWbXMqm8eiy9r1bru824U6ebeIyEWSguqxbcdPeoSHL4ct00sFyp7htZ').checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

// api to delete all products from the cart of a user after the payment is successful
app.delete('/api/empty-cart', async (req, res) => {
  console.log('emptyCart api called');
  const { authorization } = req.headers;
  if (!authorization) {
      return res.status(400).json({ error: 'Authorization header is required' });
  }
  try {
      const token = authorization.split(' ')[1];
      jwt.verify(token, JWTSecret, async (err, decoded) => {
          if (err) {
              return res.status(401).json({ error: 'Invalid token' });
          }

          try {
            console.log('decoded email: ' + decoded.email);

              const database = client.db('easyshopper');
              const cart = database.collection('userCarts');

              console.log('cart: ' + cart);
              await cart.deleteMany({ email: decoded.email });

              return res.json({ status: 'Cart emptied' });
          } catch (error) {
              console.error('Error deleting cart items:', error);
              return res.status(500).json({ error: 'Error deleting cart items' });
          }
      });
  } catch (error) {
      console.error('Error validating user:', error);
      return res.status(500).json({ error: 'Error validating user' });
  }
});
app.listen(4242, () => console.log('Running on port 4242'));

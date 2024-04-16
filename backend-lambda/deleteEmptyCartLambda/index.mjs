import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const JWTSecret = process.env.JWT_SECRET;
const uri = process.env.MONGO_URI;

export const handler = async (event) => {
  const { authorization } = event.headers;
  
  if (!authorization) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization header is required' })
    };
  }
  
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWTSecret);
    
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    
    const database = client.db('easyshopper');
    const cart = database.collection('userCarts');
    
    await cart.deleteMany({ email: decoded.email });

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'Cart emptied' })
    };
  } catch (error) {
    console.error('Error deleting cart items:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error deleting cart items' })
    };
  }
};

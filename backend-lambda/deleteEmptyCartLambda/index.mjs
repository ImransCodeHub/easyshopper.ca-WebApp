import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const JWTSecret = process.env.JWT_SECRET;
const uri = process.env.MONGO_URI;

export const handler = async (event) => {
  console.log('Event: ', event);

  const { Authorization } = event.headers;
  
  console.log('Authorization: ', Authorization);
  
  if (!Authorization) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization header is required' })
    };
  }
  
  try {
    const token = Authorization.split(' ')[1];
    console.log('Token' + token); 
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

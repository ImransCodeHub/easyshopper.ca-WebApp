import { MongoClient, ServerApiVersion } from "mongodb";
import jwt from 'jsonwebtoken';

export const handler = async (event) => {
  console.log('Event', event);
  
  const uri = process.env.MONGO_URI;
  const JWTSecret = process.env.JWT_SECRET;

  const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
  );

  try {
    // extract authorization token from headers
    const { headers } = event;
    const { Authorization } = headers;

    if (!Authorization) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Authorization header is required '}),
        };
    }

    const token = Authorization.split(' ')[1];
    console.log('Token' + token);

    // verify token with jwtsecret
    const decoded = jwt.verify(token, JWTSecret);

    // connect to mongodb
    await client.connect();
  
    const database = client.db('easyshopper');
    const cart = database.collection('userCarts');
    
    // find cart items based on decoded email
    const cartItems = await cart.find({ email: decoded.email }).toArray();

    // close mongodb connection
    await client.close();

    // return statuscode 200 if successful
    return {
        statusCode: 200,
        body: JSON.stringify({ cart: cartItems }),
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error '}),
    };
  }
}
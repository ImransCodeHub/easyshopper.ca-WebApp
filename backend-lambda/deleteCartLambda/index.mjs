import { MongoClient, ServerApiVersion } from "mongodb";
import jwt from 'jsonwebtoken';

const uri = process.env.MONGO_URI;
const JWTSecret = process.env.JWT_SECRET;

export const handler = async (event) => {
    console.log('Event: ', event);

    // parse incoming event to get productId
    const { productId } = event.pathParameters;

    console.log('ProductId: ', productId);

    // make a connection to mongodb
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            }
        }
    );

    // extract authorization token from headers
    const { Authorization } = event.headers;
    if (!Authorization) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Authorization header is required '})
        };
    }

    try {
        // verify jwt token
        const token = Authorization.split(' ')[1];
        console.log('Token' + token); 
        const decoded = jwt.verify(token, JWTSecret);

        // connect to mongodb
        await client.connect();
        const database = client.db('easyshopper');
        const cart = database.collection('userCarts');

        // delete product with productid from users cart db
        const deleteResult = await cart.deleteOne({ productId: productId, email: decoded.email});

        // return statuscode 200 if successful
        return {
            statusCode: 200,
            body: JSON.stringify({ deletedProducts: deleteResult.deletedCount })
        };
    } catch (error) {
        console.error('Error: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error validating user' })
        };
    }
}
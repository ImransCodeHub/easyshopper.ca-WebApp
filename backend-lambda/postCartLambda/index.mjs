import { MongoClient, ServerApiVersion } from "mongodb";
import jwt from 'jsonwebtoken';

const uri = process.env.MONGO_URI;
const JWTSecret = process.env.JWT_SECRET;

export const handler = async (event) => {
    console.log('Event: ', event);

    // parse incoming event to get productId and quantity
    const { productId } = event.pathParameters;
    const { quantity } = JSON.parse(event.body);

    const client = new MongoClient(uri,  {
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
            statudCode: 400,
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
        const products = database.collection('products');

        // find product in the users cart
        const product = await cart.findOne({ productId, email: decoded.email });

        // update product quantity in products collection
        const productData = await products.findOne({ productId });
        if (productData) {
            await products.updateOne({ productId }, { $inc: { 'inventory.quantity': -quantity }} );
        } else {
            console.log('Product not found in the products collection');
        }

        // update cart
        if (product) {
            await cart.updateOne({ productId }, { $inc: { quantity } });
        } else {
            await cart.insertOne({ productId, quantity, email: decoded.email });
        }

        // close mongodb connection
        await client.close();
        
        // return statuscode 200 if successful
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'Product added to cart' })
        };
    } catch (error) {
        console.error('Error: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error validating user' })
        };
    }
}
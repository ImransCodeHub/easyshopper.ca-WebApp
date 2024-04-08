import { MongoClient, ServerApiVersion } from "mongodb";

export const handler = async (event) => {
  
  const uri = process.env.MONGO_URI;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
  );
  
  try {
        await client.connect();
    
        const database = client.db('easyshopper');
        const products = database.collection('products');
        // Extract productId from the event path parameters
        const productId = event.pathParameters.productId;
        const product = await products.findOne({ productId });

        // Check if product exists
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Product not found' })
            };
        }
        
        console.log('Event: ', event);

        // return product;
    return {
            statusCode: 200,
            body: JSON.stringify(product)
        };

    }   
    finally {
        await client.close();
    }
}

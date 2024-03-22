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
    const product = await products.find({})
  

    console.log(product);
    return product;
    
  }
  finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
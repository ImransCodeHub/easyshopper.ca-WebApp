import express from 'express';
import cors from 'cors';
import {client, ObjectId} from './mongo.js';


const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/products', async (req, res) => {
    //const products = await client.db('easyshopper').collection('products').find().toArray();
    //res.json(products);

    const database = client.db('easyshopper');
    const products = database.collection('products');
    const product = await products.find({}).toArray();
    res.json(product);
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
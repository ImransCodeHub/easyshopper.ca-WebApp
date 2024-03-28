import express from 'express';
import cors from 'cors';
import client from './mongo.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/products', async (req, res) => {
    const database = client.db('easyshopper');
    const products = database.collection('products');
    const product = await products.find({}).toArray();
    res.json(product);
});

// Route to handle requests for fetching product details based on product ID
app.get('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;

    const database = client.db('easyshopper');
    const products = database.collection('products');
    const product = await products.findOne({ productId });
    res.json(product);
});

// Route to handle requests for fetching the cart
app.get('/api/cart', async (req, res) => {
    const database = client.db('easyshopper');
    const cart = database.collection('userCarts');
    const cartItems = await cart.find({}).toArray();
    res.json({ cart: cartItems });
});

// Route to handle requests for adding a product to the cart
//TODO: Append the email to the cart data as user identifier
app.post('/api/cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    const database = client.db('easyshopper');
    const cart = database.collection('userCarts');
    const product = await cart.findOne({ productId });

    const products = database.collection('products');
    const productData = await products.findOne({ productId });
    //TODO: Update the quantity of the product in the products collection, so update by reducing the quantity by the quantity added to the cart.
    if (productData) {
        await products.updateOne({ productId }, { $inc: { "inventory.quantity": -quantity } });
    } else {
        console.log('Product not found in the products collection');
    } 

    //TODO: If the quantity is 0, make the product unavailable in the shop, product and the cart page. - Frontend part  
    if (product) {
        await cart.updateOne({ productId }, { $inc: { quantity } });
    } else {
        await cart.insertOne({ productId, quantity });
    }

    res.json({ status: 'ok' });
});

// Route to handle requests for removing a product from the cart
//TODO: Test this route
//TODO: If the product is removed from the cart, update the quantity of the product in the products collection, so update by increasing the quantity by the quantity removed from the cart. - Backend part
app.delete('/api/cart/:productId', async (req, res) => {
    const productId = req.params.productId;

    const database = client.db('easyshopper');
    const cart = database.collection('userCarts');
    const product = await cart.findOne({ productId });

    const products = database.collection('products');
    const productData = await products.findOne({ productId });

    if (productData) {
        await products.updateOne({ productId }, { $inc: { "inventory.quantity": + cart.quantity } });
    } else {
        console.log('Product not found in the products collection');
    }

    if (product) {
        await cart.deleteOne({ productId });
    } else {
        console.log('Product not found in the cart collection');
    }

    res.json({ status: 'ok' });
});

//TODO: Add GET /api/products/:id/reviews endpoint to get all reviews for a product
//TODO: Add POST /api/products/:id/reviews endpoint to add a review for a product

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
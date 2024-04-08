import express from 'express';
import cors from 'cors';
import client from './mongo.js';
import jwt from 'jsonwebtoken';
import { getGoogleOauthURL, oauthClient } from './oauthClient.js';

const app = express();
app.use(express.json());
app.use(cors());

// TODO: Add a JWT secret key to the .env file
const JWTSecret = "test123";

const googleOauthURL = getGoogleOauthURL();

const getAccessAndBearerTokenUrl = (assess_token) => {
    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${assess_token}`;
}

// const updateOrCreateUserFromOauth = async (user) => {
//     const database = client.db('easyshopper');
//     const users = database.collection('users');
//     const existingUser = await
//         users.findOne({ email: user.email });


app.get('/api/google/auth/callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauthClient.getToken(code);
    
    // oauthClient.setCredentials(tokens);
    // const { data } = await oauthClient.get(getAccessAndBearerTokenUrl(tokens.access_token));
    // res.json(data);

    const url = getAccessAndBearerTokenUrl(tokens.access_token);

    const myHeaders = new Headers();
    const bearerToken= `Bearer ${tokens.access_token}`;
    myHeaders.append("Authorization", bearerToken);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    //TODO: Update the user in the database if the user already exists, else create a new user

    //TODO: Redirect to the login page with the JWT token - update the url
    fetch(url, requestOptions)
        .then((response) => response.json())
        //.then((result) => updateOrCreateUserFromOauth(result))
        .then((user) => {
            console.log(user)
            jwt.sign( {"name":user.name, "email":user.email}, JWTSecret, {expiresIn: '2d'}, (err, token) => {
                if(err) {
                    res.status(500).json(err);
                }
                res.redirect(`http://localhost:3000/login?token=${token}`); //TODO: Update the URL - nabar.jsx?
            });
        })
        .catch((error) => 
        {
            console.error(error);
            res.status(500).json(err);
        });
});

app.get('/api/google/url', (req, res) => {
    res.status(200).json({ url: googleOauthURL });
});

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
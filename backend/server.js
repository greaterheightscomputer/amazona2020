import express from 'express';
import path from 'path';  
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

const mongodbUrl = config.MONGODB_URL;  

mongoose.connect(mongodbUrl, { 
    useNewUrlParser: true,    
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express(); 

app.use(bodyParser.json()); //It will enable us to read the data value pass-in to signin and register components and use the data in the node application either to filter a user or to create a user in the mongodb database
app.use("/api/users", userRoute)  //its will be appending the last part of url or end-point to the "/api/users" like this '/signin', '/register', '/createadmin' once the http request is made from frontend/actions/userAction file
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.get("/api/config/paypal", (req, res) => { //route for payment
    res.send(config.PAYPAL_CLIENT_ID); //return client_id to frontend
})

// //static api for product list
// app.get("/api/products", (req, res)=>{    
//     res.send(data.products); 
// })

// //static api for product detail
// app.get("/api/products/:id", (req, res)=>{    
//     const productId = req.params.id;
//     const product = data.products.find((product) => product._id === productId);
    
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({ msg: "Product Not Found." }); 
// });

app.use(express.static(path.join(__dirname, '/../frontend/build'))); //the path to serve up our public OR frontend asset when deployed 
app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))); //All the request made by user render on the index.html page beco's it is the root page where all pages render and when a bad request is made the index.html render instead of the render error 404

app.listen(config.PORT, () =>{console.log("Server started at http://localhost:5000")})
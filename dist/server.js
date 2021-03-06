"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = (0, _express.default)();
app.use(_bodyParser.default.json()); //It will enable us to read the data value pass-in to signin and register components and use the data in the node application either to filter a user or to create a user in the mongodb database

app.use("/api/uploads", _uploadRoute.default); //"/api/uploads" means rout while uploadRoute means respondent 

app.use("/api/users", _userRoute.default); //its will be appending the last part of url or end-point to the "/api/users" like this '/signin', '/register', '/createadmin' once the http request is made from frontend/actions/userAction file

app.use("/api/products", _productRoute.default);
app.use("/api/orders", _orderRoute.default);
app.get("/api/config/paypal", (req, res) => {
  //route for payment
  res.send(_config.default.PAYPAL_CLIENT_ID); //return client_id to frontend
}); // //static api for product list
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
//here we need to serve-up /uploads folder in development mode while express.static(path.join(__dirname, '/../uploads') is to serve-up uploads folder in production mode

app.use('/uploads', _express.default.static(_path.default.join(__dirname, '/../uploads'))); //__dirname means the currect directory, '/../uploads' means in production mode uploads folder will be inside and serve-up from dist folder like this /dist/uploads

app.use(_express.default.static(_path.default.join(__dirname, '/../frontend/build'))); //the path to serve up our public OR frontend asset when deployed 

app.get('*', (req, res) => res.sendFile(_path.default.join(`${__dirname}/../frontend/build/index.html`))); //All the request made by user render on the index.html page beco's it is the root page where all pages render and when a bad request is made the index.html render instead of the render error 404

app.listen(_config.default.PORT, () => {
  console.log("Server started at http://localhost:5000");
});
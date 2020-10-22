"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  //creating route for getting list of all products
  const category = req.query.category ? {
    category: req.query.category
  } : {}; // console.log('Category: ',category)  
  // console.log('req: ',req.query)    

  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {}; // console.log('SearchKeyword: ',searchKeyword)

  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : {
    price: -1
  } : {
    _id: -1
  }; // console.log('OrderBy: ',sortOrder) //if sortOrder is empty the sortOrder will be base on _id: -1

  const products = await _productModel.default.find({ ...category,
    ...searchKeyword
  }).sort(sortOrder);
  res.send(products);
});
router.get("/:id", async (req, res) => {
  //creating route for product detail page         
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not found."
    });
  }
});
router.post("/", _util.isAuth, _util.isAdmin, async (req, res) => {
  //isAuth, isAdmin, its will only allow user with these priviledge to save, update and delete data  
  const product = new _productModel.default({
    name: req.body.name,
    //fill the product properties with req.body from client 
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({
      message: 'New Product Created',
      data: newProduct
    });
  }

  return res.status(500).send({
    message: 'Error in Creating Product.'
  });
});
router.put("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  //for update already existing product
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updateProduct = await product.save();

    if (updateProduct) {
      return res.status(200).send({
        message: 'Product Updated',
        data: updateProduct
      });
    }
  }

  return res.status(500).send({
    message: 'Error in Updating Product.'
  });
});
router.delete("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deleteProduct = await _productModel.default.findById(productId);

  if (deleteProduct) {
    await deleteProduct.remove();
    res.send({
      message: "Product Deleted"
    });
  } else {
    res.send("Error in Deletion.");
  }
});
router.post("/:id/reviews", _util.isAuth, async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };
    product.reviews.push(review); //save the new value inside product.reviews array in mongodb
    //need to update two properties of product object which are numReviews and rating

    product.numReviews = product.reviews.length; //length of the reviews array object

    product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length; //its return average rating

    const updatedProduct = await product.save(); // console.log(updatedProduct)

    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      //[updatedProduct.reviews.length-1] means return or send the last item or element inside updatedProduct.reviews on the Network           
      message: 'Review saved successfully.'
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found.'
    });
  }
});
var _default = router;
exports.default = _default;
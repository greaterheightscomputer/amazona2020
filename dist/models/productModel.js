"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// productSchema-> define how products will be saved in the mongodb database, its consist of the properties name with their data type 
const reviewSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    default: 0,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  numReviews: {
    type: Number,
    default: 0,
    required: true
  },
  reviews: [reviewSchema]
});

const productModel = _mongoose.default.model("Product", productSchema); //1st argument "Product" is a collection, 2nd argument is the productSchema


var _default = productModel;
exports.default = _default;
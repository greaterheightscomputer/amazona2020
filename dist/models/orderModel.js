"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//defining how user will save order information in the mongodb
const shippingSchema = {
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
};
const paymentSchema = {
  paymentMethod: {
    type: String,
    required: true
  }
};
const orderItemSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  } //fetching product._id from Product collection in database and storing it inside product object property    

});
const orderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  //fetching user detail from User collection in database and storing it inside user object property
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  //nesting shippingSchema inside orderSchema
  payment: paymentSchema,
  //nesting paymentSchema inside orderSchema
  itemsPrice: {
    type: Number
  },
  taxPrice: {
    type: Number
  },
  shippingPrice: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true //whenever a new order is created it generate creation date and if their is update in order its also generate new updation date

});

const orderModel = _mongoose.default.model("Order", orderSchema);

var _default = orderModel;
exports.default = _default;
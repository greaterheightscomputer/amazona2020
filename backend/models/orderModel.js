import mongoose from 'mongoose';

//defining how user will save order information in the mongodb
const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
};

const paymentSchema = {
    paymentMethod: { type: String, required: true }    
};

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },     
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //fetching product._id from Product collection in database and storing it inside product object property    
});

const orderSchema = new mongoose.Schema({        
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //fetching user detail from User collection in database and storing it inside user object property
    orderItems: [orderItemSchema],
    shipping: shippingSchema,  //nesting shippingSchema inside orderSchema
    payment: paymentSchema,     //nesting paymentSchema inside orderSchema
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, {
    timestamps: true //whenever a new order is created it generate creation date and if their is update in order its also generate new updation date
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
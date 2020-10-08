import express from 'express';
import { isAuth, isAdmin } from '../util';
import Order from '../models/orderModel';

const router = express.Router();

//backend for fetch all orders made by customers
router.get("/", isAuth, async(req, res) => { 
    const orders = await Order.find({}).populate('user');  //populate('user') means i wan to have access to user information in database
    // console.log(orders)
    res.send(orders);    
});

router.get("/mine", isAuth, async(req, res) => { //this route or endpoint most be the 1st endpoint in the file
    const orders = await Order.find({ user: req.user._id });
    // console.log(orders)
    res.send(orders);    
});


//backend for detailOrder 
router.get("/:id", isAuth, async(req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if(order){
        res.send(order);
    }else {
        res.status(404).send("Order Not Found.")
    }
});

//backend for deleteOrder 
router.delete("/:id", isAuth, isAdmin, async(req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if(order){
        const deletedOrder = await order.remove();
        res.send(deletedOrder);
    }else {
        res.status(404).send("Order Not Found.")
    }
});

//backend for creating order
router.post("/", isAuth, async(req, res)=>{ //isAuth means only signin user will have access to this http request
    const newOrder = new Order({        
        orderItems: req.body.orderItems,
        user: req.user._id,        
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,        
    });
    const newOrderCreated = await newOrder.save();    
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

//backend for payOrder
router.put("/:id/pay", isAuth, async(req, res)=>{ //updating the existing order
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();        
        res.send({ message: 'Order Paid.', order: updatedOrder });
        // console.log(updatedOrder)
    } else {
        res.status(404).send({ message: 'Order not found.' });
    }
});

export default router;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props){    
    
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete; 
    
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;
    const dispatch = useDispatch();     

    useEffect(() => {                
        dispatch(listOrders()); //showing list of orders to admin
        return () => {
            //
        }
    }, [successDelete]) //if successDelete === true its will dispatch(listOrders()) and refresh the browser
   
    const deleteHandler = (order) =>{
        dispatch(deleteOrder(order._id));
    }

    return loading ? <div>loading...</div> :
        <div className="content content-margined">
        {/*Start of Order*/}
        <div className="order-header">
            <h3>Orders</h3>
        </div>
        {/*End of Order*/}
        
        {/*Start of Order List*/}
        <div className="order-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>USER</th>
                        <th>PAID</th>
                        <th>PAID AT</th>
                        <th>DELIVERED</th>
                        <th>DELIVERED AT</th>
                        <th>ACTIONS</th>
                    </tr>                                    
                </thead>
                <tbody>
                    {
                        orders.map(order =>(<tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.user.name}</td>
                            <td>{order.isPaid.toString()}</td>
                            <td>{order.paidAt}</td>
                            <td>{order.isDelivered.toString()}</td>
                            <td>{order.deliveredAt}</td>                            
                            <td>
                                <Link to={`/order/${order._id}`} className="button secondary">Details</Link>
                                
                                <button className="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
                            </td>
                    </tr>))
                    }                    
                </tbody>
            </table>
        </div>
        {/*Start of Order List*/}
    </div>   
}
export default OrdersScreen;
import React, { useEffect, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props){
    // console.log(props.match.params.id);
    const id = props.match.params.id;
    // const product = data.products.find((product) => product._id === id);
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);    
    const { product, loading, error } = productDetails;    
    const dispatch = useDispatch();     

    useEffect(() => {
        dispatch(detailsProduct(id))
        return () => {
            //
        }
    }, []) //[input] will be empty [] which means dispatch(detailsProduct()) will be executed or run after the componentDidMount or component has render to the browser

    const handleAddToCart = () => {
        props.history.push(`/cart/${id}?qty=${qty}`);    
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>

        {   loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
            (
                <div className="details">
                    <div className="details-image">                        
                        <img src={product.image} alt="product"/>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews} Reviews)
                            </li>
                            <li>
                                Price: $<b>{product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>{product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: ${product.price}
                            </li>
                            <li>
                                Status: {product.countInStock > 0 ? "In Stock" : " Out of Stock"}
                            </li>
                            <li>
                                Qty: <select value={qty} onChange={(e) =>{ setQty(e.target.value)}}>
                                    {/*<option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>                                    
                                */}
                                {   //getting the option tag from server
                                    [...Array(product.countInStock).keys()].map((productCount) =>
                                    <option key={productCount + 1} value={productCount + 1}>{productCount + 1}</option>
                                )}
                                </select>
                            </li>
                            <li>
                                { product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button> }
                            </li>
                        </ul>
                    </div>
                </div>       
            )
        }                
    </div>
}
export default ProductScreen;
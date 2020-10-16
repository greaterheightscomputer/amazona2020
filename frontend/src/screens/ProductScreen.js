import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props){    
    const id = props.match.params.id;    
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state)=>state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector(state => state.productDetails);    
    const { product, loading, error } = productDetails;    
    const productSaveReview = useSelector((state) =>state.productReviewSave)
    const { success: productSaveSuccess } = productSaveReview;
    const dispatch = useDispatch();     

    useEffect(() => {
        if(productSaveSuccess){ //Once the success === true (success is once of property that return by PRODUCT_REVIEW_SAVE_SUCCESS action.type ) then do the following
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(id))
        return () => {
            //
        }
    }, []);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveProductReview(id, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
    };

    const handleAddToCart = () => {
        props.history.push(`/cart/${id}?qty=${qty}`);    
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        { loading ? (
            <div>Loading...</div>
            ) : error ? (
            <div>{error}</div> 
            ) : ( 
               <> 
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
                                {/*{product.rating} Stars.. ({product.numReviews} Reviews)*/}
                                <a href="#reviews">
                                    <Rating
                                        value={product.rating}
                                        text={product.numReviews + ' reviews'}
                                    />
                                </a>
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

                {/* Review Section */}
                <div className="content-margined">                    
                    <h2>Reviews</h2>
                    {!product.reviews.length && <div>There is no review</div>}
                    {/*!product.reviews && <div>There is no review</div>*/}
                    <ul className="review" id="reviews">
                        {product.reviews.map((review) =>( 
                            <li key={review._id}>
                                <div>{review.name}</div>
                                <div>
                                    <Rating value={review.rating}></Rating>                    
                                </div>
                                <div>{review.createdAt.subtring(0, 10)}</div>
                                <div>{review.comment}</div>
                            </li>
                            ))}
                        {/* Add New Customer Review */}
                        <li>
                            <h3>Write a customer review</h3>
                            {/* userInfo here if the userInfo exist or indicate that only already signin user can input product review  else inform user that they need to login before they can input review(s)*/}
                            {userInfo ? <form onSubmit={submitHandler}>         
                                <ul className="form-container">
                                    <li>
                                        <label htmlFor="rating">Rating</label>
                                        <select name="rating" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)}>
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very Good</option>
                                            <option value="5">5- Excelent</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                    </li>
                                    <li>
                                        <button type="submit" className="button primary">Submit</button>
                                    </li>
                                </ul>
                                </form> :
                                <div>Please <Link to="/signin">Sign-in</Link> to write a review.</div>
                            }
                        </li>                        
                    </ul>
                </div>
                </> 
            )
        }                
    </div>
}
export default ProductScreen;
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props){
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';     
    // console.log(category)   
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {        
        dispatch(listProducts(category));        
        return () => {
            //
        }
    }, [category]);
    
    const submitHandler = (e) => {
        e.preventDefault();        
        dispatch(listProducts(category, searchKeyword, sortOrder))        
    }
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder))        
    }
    console.log(category)

    return <div className="content">
        {category &&    
            <h2>{category}</h2>}
        
            <ul className="filter">
                {/*Search of product using text*/}
                <li>
                    <form onSubmit={submitHandler}>
                        <input type="text" name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)}/>
                        <button type="submit">Search</button>
                    </form>
                </li>
                
                {/*Filtering product using Newest product, Highest and Lowest Price */}
                <li>
                    Sort By {'  '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">Newest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </li>
            </ul>
            
        {/*products render on the home page screen*/}
        {loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        <ul className="products">
        { 
            products.map((product)=>                    
            <li key={product._id}>
                <div className="product">
                    <Link to={`/products/${product._id}`}>
                        <img className="product-image" src={product.image} alt="product"/>
                    </Link>                    
                    <div className="product-name">
                        <Link to={`/products/${product._id}`}>{product.name}</Link>             
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                        {/*{product.rating} Stars ({product.numReviews} Reviews)*/}
                        <Rating
                            value={product.rating}
                            text={product.numReviews + ' reviews'}
                        />
                    </div>
                </div>
            </li>                                                                         
            )
        }
        </ul>
    }
    </div>    
}
export default HomeScreen;
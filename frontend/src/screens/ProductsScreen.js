import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props){    
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');   
    const [uploading, setUploading] = useState(false);
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave; 
    
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete; 
    
    const productList = useSelector(state => state.productList);
    const { loding, products, error } = productList;
    const dispatch = useDispatch();     

    useEffect(() => {        
        if(successSave){
            setModalVisible(false)   //once product is created or updated it will close the form 
        }
        dispatch(listProducts()); //showing list of products to admin
        return () => {
            //
        }
    }, [successSave, successDelete]) //if successDelete or successSave === true its will dispatch(listProducts()) and refresh the browser

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id, name, price, image, brand, category, countInStock, description}));
    };
    
    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id));
    };

    const uploadFileHandler = (e) =>{
        const file = e.target.files[0];  //files[0] means its take one single file at a time
        const bodyFormData = new FormData();
        bodyFormData.append('image', file); //'image' is a filename 
        setUploading(true); //its will show loading bar like this <div>Loading...</div> while its processing the http or ajax request
        axios.post('/api/uploads', bodyFormData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        }).then((response)=>{
            setImage(response.data);
            setUploading(false);
        }).catch((error)=>{
            console.log(error);
            setUploading(false);
        })
    }

    return <div className="content content-margined">
        {/*Start of Create Product Button*/}
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={()=>openModal({})}>Create Product</button>
        </div>
        {/*End of Create Product Button*/}

        {/*Start of Product Form*/}
        {/*Hidding of product form and make it open when click on Create Product button*/}
        { modalVisible &&  //if modalVisible === true then render the product form
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Create Product</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) =>setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="text" name="price" id="price" value={price} onChange={(e) =>setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input type="text" name="image" id="image" value={image} onChange={(e) =>setImage(e.target.value)} />
                            <input type="file" onChange={uploadFileHandler}/>
                            {uploading && <div>Uploading...</div>}
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" value={brand} onChange={(e) =>setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">Count in Stock</label>
                            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) =>setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" value={category} onChange={(e) =>setCategory(e.target.value)} />
                        </li>                        
                        <li>
                            <label htmlFor="description">Description</label>
                            <textarea type="text" name="description" id="description" value={description} onChange={(e) =>setDescription(e.target.value)} ></textarea>
                        </li>                
                        <li>
                            <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() =>setModalVisible(false)} className="button secondary">Back</button>
                        </li>                
                    </ul>
                </form>                        
            </div>        
        }
        {/*End of Product Form*/}
        
        {/*Start of Product List*/}
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>                                    
                </thead>
                <tbody>
                    {
                        products.map(product =>(<tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button" onClick={() => openModal(product)}>Edit</button>
                                {'  '}
                                <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                    </tr>))
                    }                    
                </tbody>
            </table>
        </div>
        {/*Start of Product List*/}
    </div>   
}
export default ProductsScreen;
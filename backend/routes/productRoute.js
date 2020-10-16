import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async(req, res) => { //creating route for getting list of all products
    const category = req.query.category ? { category: req.query.category } : {};
    // console.log('Category: ',category)  
    // console.log('req: ',req.query)    
    const searchKeyword = req.query.searchKeyword ? {
        name: {
            $regex: req.query.searchKeyword,
            $options: 'i'
        }
    } : {};
    console.log('SearchKeyword: ',searchKeyword)
    const sortOrder = req.query.sortOrder ?
        (req.query.sortOrder === 'lowest' ? { price: 1 } : { price:-1 })
        : { _id: -1 }; 
    // console.log('OrderBy: ',sortOrder) //if sortOrder is empty the sortOrder will be base on _id: -1

    const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
    res.send(products);
})

router.get("/:id", async(req, res) => { //creating route for product detail page         
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({ message:"Product not found." });
    }
});

router.post("/", isAuth, isAdmin, async(req, res) => {  //isAuth, isAdmin, its will only allow user with these priviledge to save, update and delete data  
    const product = new Product({
        name: req.body.name,    //fill the product properties with req.body from client 
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
    if(newProduct){
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: 'Error in Creating Product.' })
});

router.put("/:id", isAuth, isAdmin,  async(req, res) => { //for update already existing product
    const productId = req.params.id;    
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;         

        const updateProduct = await product.save();
        if(updateProduct){
            return res.status(200).send({ message: 'Product Updated', data: updateProduct });
        }
    }   
    return res.status(500).send({ message: 'Error in Updating Product.' })
});

router.delete("/:id", isAuth, isAdmin, async(req, res)=>{
    const productId = req.params.id;
    const deleteProduct = await Product.findById(productId);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({ message: "Product Deleted" });
    }else{
        res.send("Error in Deletion.");
    }
});

export default router;
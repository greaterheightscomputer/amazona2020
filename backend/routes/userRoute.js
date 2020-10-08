import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) =>{ //provide backend for SigninScreen component
    
    const signinUser = await User.findOne({ //findOne() its will filter the database with email and password if exist its return the user information into siginUser object
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){ //if user exist
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)   //send back a token which is an identifier that can be use to authenticate and has authorise a user
        })
        // console.log('signinUser: ',signinUser) 
    }else{
        res.status(401).send({msg: 'Invalid Email or Password.'})
    }
})

router.post('/register', async (req, res) =>{ //provide backend for RegisterScreen component

    const user = new User({ //create new user inside mongodb
        name: req.body.name,  //req.body.name means get the value from RegisterScreen component
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if(newUser){ //if newUser exist
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)  
        })    
        // console.log('register: ',newUser) 
    }else{
        res.status(401).send({msg: 'Invalid User Data.'})
    }
})

router.get('/createadmin', async (req, res) =>{  //to create admin user on the mongodb database
    try{
        const user = new User({ 
            name: "greater",
            email: "greater@gmail.com",
            password: '1234',
            isAdmin: true
        });
        const newUser = await user.save();  
        res.send(newUser);
    }catch(error){
        res.send({ msg: error.message });
    }    
});

router.put('/:id', isAuth, async (req, res) =>{ //provide backend for updating ProfileScreen component
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.name = req.body.name || user.name;  //req.body.name its will add new value to user.name property || user.name its will add previous value to user.name property;  
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({ 
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser)   
        });
        // console.log('updatedUser: ',updatedUser) 
    }else{
        res.status(404).send({msg: 'User Not Found.'});
    }
})


export default router;
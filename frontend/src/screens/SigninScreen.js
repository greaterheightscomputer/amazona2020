import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props){    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;    
    const dispatch = useDispatch();     
    
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'; //if props.location.search exist redirect user to shipping component else redirect user to home component becos we want to the user to start the process of making payment for their purchase

    useEffect(() => {
        if(userInfo){
            // props.history.push("/")  //if userInfo exist redirect user to the home page
            props.history.push(redirect)  //redirect store shipping once the user signin it redirect the user to shipping component
        }
        return () => {
            //
        }
    }, [userInfo]) //if userInfo state changes then this line of code if (userInfo){props.history.push("/")} will run  

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) =>setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) =>setPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to amazona?
                </li>
                <li>
                    {/*<Link to="/register" className="button secondary text-center">Create your amazona account</Link>*/}
                    <Link to={redirect==="/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create your amazona account</Link>
                    {/*redirect==="/"  means if you access register componet throught other path such as http://localhost:3000/register then return register else if you access register component through SigninScreen component then use this path "register?redirect=" + redirect */}
                </li>                                       
            </ul>
        </form>                        
    </div>
}
export default SigninScreen;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props){    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;    
    const dispatch = useDispatch();      

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'; //localhost:3000/signin?redirect=shipping
    
    useEffect(() => {
        if(userInfo){
            // props.history.push("/")
            props.history.push(redirect)  //redirect store shipping once the user register it redirect the user to shipping component
        }
        return () => {
            //
        }
    }, [userInfo]) 

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }
    
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" onChange={(e) =>setName(e.target.value)} />
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
                    <label htmlFor="repassword">Re-Password</label>
                    <input type="repassword" name="repassword" id="repassword" onChange={(e) =>setRepassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>                
                    {/* Already have an account? <Link to="/signin">Sign-in</Link>*/}
                    Already have an account?<Link to={redirect==="/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Sign-In</Link>
                    {/*redirect==="/"  means if you access signin componet throught other path such as http://localhost:3000/signin then return signin component else if you access signin component through RegisterScreen component then use this path "signin?redirect=" + redirect */}
                </li>                
            </ul>
        </form>                        
    </div>
}
export default RegisterScreen;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Register(){
    const navigate = useNavigate();
    const [name , setName] = useState('');
    const[email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [repassword , setRepassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/api/auth/register' , {
              name , 
              email, 
              password , 
              repassword , 
            })
            localStorage.setItem('token' , response.data.token);
            navigate('/');
        }catch(err){
            setError(err.response.data.message);
        }
    };
    return(
        <form onSubmit={handleSignUp}>
            <h1>Register</h1>
             <input 
                type="name" 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
    type="password"  
    placeholder="Confirm Password"
    value={repassword}
    onChange={(e) => setRepassword(e.target.value)}
/>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    )
}

export default Register;
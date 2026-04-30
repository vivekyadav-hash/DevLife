import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email,
            password
        });
        localStorage.setItem('token' ,response.data.token);
        navigate('/dashboard');
        }catch(err){
            setError(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
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
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
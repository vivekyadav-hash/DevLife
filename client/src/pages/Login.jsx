import { useState } from "react";
import axios from "axios";
import { useNavigate  , Link} from "react-router-dom";

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
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-10 w-full max-w-md shadow-xl">
                <h1 className="text-3xl font-bold text-blue-400 mb-2">DevLife</h1>
                <p className="text-gray-400 mb-8">Welcome back. Login to continue.</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button className="bg-blue-500 hover:bg-blue-600 rounded-lg py-3 font-semibold transition">
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-sm mt-6 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
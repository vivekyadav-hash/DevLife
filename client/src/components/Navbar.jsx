import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <h2 className="text-2xl font-bold text-blue-400">DevLife</h2>
            <div className="flex gap-6 items-center">
                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                <Link to="/tasks" className="hover:text-blue-400 transition">Tasks</Link>
                <Link to="/expenses" className="hover:text-blue-400 transition">Expenses</Link>
                <Link to="/habits" className="hover:text-blue-400 transition">Habits</Link>
                <button 
                    onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
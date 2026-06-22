import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showAiPop, setShowAiPop] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-gray-900 text-white px-4 md:px-8 py-4 shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-400">DevLife</h2>
                
                {/* Hamburger button - only on mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-6 items-center">
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
            </div>

            {/* Mobile menu - shows when isOpen is true */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-4 pb-4">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">Dashboard</Link>
                    <Link to="/tasks" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">Tasks</Link>
                    <Link to="/expenses" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">Expenses</Link>
                    <Link to="/habits" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">Habits</Link>
                    <Link className="hover:text-blue-400 transition">Roadmap  <AiPop onClose={() => setShowAiPop(false)}/></Link>

                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition w-fit">
                        Logout
                    </button>
                </div>
            )}
      <div className="px-4 md:px-8 py-2">
    <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-3 py-1 rounded-full animate-pulse">
        🚧 v2 in progress
    </span>
</div>
        </nav>
    );
}

export default Navbar;
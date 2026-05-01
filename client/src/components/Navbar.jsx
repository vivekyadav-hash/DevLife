import {Link , useNavigate } from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }


return (
    <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px'}}>
        <h2>DevLife</h2>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Link to="/tasks">Tasks</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/habits">Habits</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </nav>
);
}

export default Navbar;
import { useEffect , useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [ tasks , setTasks] = useState([]);
    const [expenses , setExpenses] = useState([]);
    const [habits , setHabits] = useState([]);
    const token = localStorage.getItem('token');

   useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        
        const [tasksRes, expensesRes, habitsRes] = await Promise.all([
            axios.get('http://localhost:8080/api/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:8080/api/expenses', {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:8080/api/habits', {
                headers: { Authorization: `Bearer ${token}` }
            })
        ]);

        setTasks(tasksRes.data.tasks);
        setExpenses(expensesRes.data.expenses);
        setHabits(habitsRes.data.habits);
    };

    fetchData();
}, []);
const completedHabits = habits.filter(habit => habit.isCompleted === true);
const notcompletedHabits = habits.filter(habit => habit.isCompleted === false);

    return (
    <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
            <h1 className="text-3xl font-bold mb-8">Welcome back! 👋</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-400 text-sm mb-2">Total Tasks</h3>
                    <p className="text-4xl font-bold text-blue-400">{tasks.length}</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-400 text-sm mb-2">Total Expenses</h3>
                    <p className="text-4xl font-bold text-green-400">{expenses.length}</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-400 text-sm mb-2">Habits Completed</h3>
                    <p className="text-4xl font-bold text-purple-400">{completedHabits.length}</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-gray-400 text-sm mb-2">Habits Remaining</h3>
                    <p className="text-4xl font-bold text-red-400">{notcompletedHabits.length}</p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Dashboard;
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
        <div>
            <h1>Welcome back!</h1>
            <div>
                <div>
                    <h3>Total Tasks</h3>
                    <p>{tasks.length}</p>
                </div>
                <div>
                    <h3>Total Expenses</h3>
                    <p>{expenses.length}</p>
                </div>
                <div>
                    <h3>Habits Completed</h3>
                    
                   <p>{completedHabits.length}</p>
                </div>
                  <div>
                    <h3>Habits NotCompleted</h3>
                    
                   <p>{notcompletedHabits.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
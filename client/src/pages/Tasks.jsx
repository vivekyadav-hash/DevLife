import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import Expenses from './Expenses';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error , setError] = useState('');
    const token = localStorage.getItem('token');

    const fetchTasks = async () => {
        const response = await axios.get(`${API_URL}/api/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data.tasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
       
        setTasks(prev => prev.filter(task => task._id !== id));
        try {
            await axios.delete(`${API_URL}/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
           
            fetchTasks();
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        
        const tempTask = {
            _id: Date.now().toString(),
            title,
            description,
            category,
            isCompleted: false
        };
        setTasks(prev => [...prev, tempTask]);

      
        setTitle('');
        setDescription('');
        setCategory('');

        try {
            
            const res = await axios.post(
                `${API_URL}/api/tasks`,
                { 
                title: tempTask.title, 
                description: tempTask.description, 
                category: tempTask.category 
            },
                { headers: { Authorization: `Bearer ${token}` } }
            );
           
            setTasks(prev => prev.map(task =>
                task._id === tempTask._id ? res.data.task : task
            ));
        } catch (err) {
          
            setTasks(prev => prev.filter(task => task._id !== tempTask._id));
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
                <h1 className="text-3xl font-bold mb-8">Tasks</h1>

                <form onSubmit={handleOnSubmit} className="bg-gray-800 rounded-2xl p-6 mb-8 flex flex-col gap-4">
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 rounded-lg py-2 font-semibold transition">
                        Add Task
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-gray-800 rounded-2xl p-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-400">{task.title}</h3>
                                <p className="text-gray-400 mt-1">{task.description}</p>
                                <p className="text-gray-500 text-sm mt-1">Category: {task.category}</p>
                                <p className={`text-sm mt-2 font-medium ${task.isCompleted ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {task.isCompleted ? '✅ Completed' : '⏳ Not Completed'}
                                </p>
                            </div>
                             {error && <p className="text-red-400 text-sm">{error}</p>} 
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tasks;